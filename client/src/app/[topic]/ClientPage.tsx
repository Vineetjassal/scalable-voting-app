"use client"

import MaxWidthWrapper from '@/components/MaxWidthWrapper';
import { useEffect, useState } from 'react';
import { Wordcloud } from '@visx/wordcloud';
import { scaleLog } from '@visx/scale';
import { Text } from '@visx/text';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useMutation } from '@tanstack/react-query';
import { submitComment } from '../actions';
import { io } from 'socket.io-client';
import QRCode from 'qrcode';
import { BiQrScan } from 'react-icons/bi';
import { FiDownload, FiShare } from 'react-icons/fi';
import { IoMdArrowRoundBack } from "react-icons/io";
import { MdDone } from 'react-icons/md';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import Link from 'next/link';

const socket = io('http://localhost:8080');

interface ClientPageProps {
  topicName: string;
  initialData: { text: string; value: number }[];
}

const COLORS = ['#143059', '#2F6B9A', '#82a6c2'];

const ClientPage = ({ topicName, initialData }: ClientPageProps) => {
  const [words, setWords] = useState(initialData);
  const [input, setInput] = useState<string>('');
  const [copyButtonClicked, setCopyButtonClicked] = useState(false);
  const [excelButtonClicked, setExcelButtonClicked] = useState(false);

  useEffect(() => {
    socket.emit('join-room', `room:${topicName}`);
  }, [topicName]);

  useEffect(() => {
    socket.on('room-update', (message: string) => {
      console.log(message);
      const data = JSON.parse(message) as { text: string; value: number }[];

      data.forEach(newWord => {
        const isWordAlreadyIncluded = words.some(word => word.text === newWord.text);

        if (isWordAlreadyIncluded) {
          setWords(prev =>
            prev.map(word =>
              word.text === newWord.text ? { ...word, value: word.value + newWord.value } : word
            )
          );
        } else if (words.length < 50) {
          setWords(prev => [...prev, newWord]);
        }
      });
    });

    return () => {
      socket.off('room-update');
    };
  }, [words]);

  const fontScale = scaleLog({
    domain: [
      Math.min(...words.map(w => w.value)),
      Math.max(...words.map(w => w.value)),
    ],
    range: [10, 100],
  });

  const { mutate, isPending } = useMutation({
    mutationFn: submitComment,
  });

  const handleCopyUrl = () => {
    const url = window.location.href;
    navigator.clipboard.writeText(url);
    setCopyButtonClicked(true);
    setTimeout(() => setCopyButtonClicked(false), 1000);
  };

  const handleDownloadQRCode = async () => {
    try {
      const qrDataURL = await QRCode.toDataURL(window.location.href);
      const link = document.createElement('a');
      link.download = 'qr-code.png';
      link.href = qrDataURL;
      link.click();
    } catch (error) {
      console.error('Error generating or downloading QR code:', error);
    }
  };

  const handleDownloadExcel = () => {
    const data = words.map(word => ({
      Word: word.text,
      Votes: word.value,
    }));

    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Word Votes');

    // Generate Excel file and download
    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const blob = new Blob([excelBuffer], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    });
    saveAs(blob, `${topicName}_word_votes.xlsx`);
    setExcelButtonClicked(true);
    setTimeout(() => setExcelButtonClicked(false), 1000);
  };

  return (
    <>
      <div className="flex mt-4 justify-between">
        <div className="justify-start">
          <Link href="/" className="text-black bg-white hover:bg-white ml-8 flex items-center border-2 p-2 pt-1 pb-1 rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50">
          <IoMdArrowRoundBack className="mr-2"/>
              Back to homepage
          </Link>
        </div>
        <div className="flex gap-4 mr-4 justify-end">
          <Button onClick={handleCopyUrl} className="bg-blue-600 text-white mb-2 sm:mb-2">
            {copyButtonClicked ? <MdDone className="mr-2" /> : <FiShare className="mr-2" />} Share URL
          </Button>
          <Button onClick={handleDownloadQRCode} className="bg-white text-black hover:bg-white mb-2 sm:mb-2">
            <BiQrScan className="mr-2" /> Download QR Code
          </Button>
          <Button onClick={handleDownloadExcel} className="mb-2 sm:mb-2">
            {excelButtonClicked ? <MdDone className="mr-2" /> : <FiDownload className="mr-2" />} Download Excel
          </Button>
        </div>
      </div>

      <div className="w-full flex flex-col items-center justify-center min-h-[90%] bg-grid-zinc-50 pb-2">
        <MaxWidthWrapper className="flex flex-col items-center gap-6 pt-12">
          <h1 className="text-4xl sm:text-5xl font-bold text-center tracking-tight text-balance">
            What people think about <span className="text-blue-600">{topicName}</span>:
          </h1>
          <p className="text-sm">(updated in real-time)</p>

          <div className="aspect-square max-w-xl flex items-center justify-center">
            <Wordcloud
              words={words}
              width={500}
              height={500}
              fontSize={data => fontScale(data.value)}
              font={'Impact'}
              padding={2}
              spiral="archimedean"
              rotate={0}
              random={() => 0.5}
            >
              {cloudWords =>
                cloudWords.map((w, i) => (
                  <Text
                    key={w.text}
                    fill={COLORS[i % COLORS.length]}
                    textAnchor="middle"
                    transform={`translate(${w.x}, ${w.y})`}
                    fontSize={w.size}
                    fontFamily={w.font}
                  >
                    {w.text}
                  </Text>
                ))
              }
            </Wordcloud>
          </div>

          <div className="max-w-lg w-full">
            <Label className="font-semibold tracking-tight text-lg pb-2">
              Here's what I think about {topicName}
            </Label>
            <div className="mt-1 flex gap-2 items-center">
              <Input
                value={input}
                onChange={({ target }) => setInput(target.value)}
                placeholder={`${topicName} is absolutely...`}
              />
              <Button disabled={isPending} onClick={() => mutate({ comment: input, topicName })}>
                Share
              </Button>
            </div>
          </div>
        </MaxWidthWrapper>
      </div>
    </>
  );
};

export default ClientPage;

