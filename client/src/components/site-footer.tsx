export function SiteFooter() {
  return (
    <footer className="py-6 md:px-40 md:py-0 mt-20">
      <hr />
      <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
        <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
          Built with ❤️ by  
          <a
          href="https://vineetjassal.vercel.app/"
          target="_blank"
          rel="noreferrer"
          className="font-medium ml-1 underline"
        >
          @vineetjassal
        </a>
        . The source code is available on
        <a
          href="https://github.com/Vineetjassal/scalable-voting-app"
          target="_blank"
          rel="noreferrer"
          className="font-medium ml-1 underline"
        >
          Github
        </a>
        .
        </p>
        <p className="text-sm leading-loose text-muted-foreground">
        © 2024. All right reserved.
        </p>
        
      </div>
    </footer>
  );
}
