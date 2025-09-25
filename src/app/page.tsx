import Image from "next/image";

// 서버 컴포넌트에서 직접 API 호출
async function getResumeInfo() {
  const res = await fetch('https://raw.githubusercontent.com/Hannaoo1/first-deploy/refs/heads/main/service/resume_general_info_service.json');
  
  // API 응답이 성공적인지 확인
  if (!res.ok) {
    // 응답이 실패하면 오류를 던져 Next.js가 오류 페이지를 보여주도록 함
    throw new Error('Failed to fetch data');
  }
  return res.json();
}


async function getResumePortfolio() {
  const res = await fetch('https://raw.githubusercontent.com/Hannaoo1/first-deploy/refs/heads/main/service/resume_portfolio_service.json');
  
  // API 응답이 성공적인지 확인
  if (!res.ok) {
    // 응답이 실패하면 오류를 던져 Next.js가 오류 페이지를 보여주도록 함
    throw new Error('Failed to fetch data');
  }
  return res.json();
}


export default async function Home() {

  const info = await getResumeInfo();
  const portfolio = await getResumePortfolio();
  
  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center p-6 sm:p-10">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <Image
          className="w-80 h-80 sm:w-48 sm:h-48 rounded-full object-cover ring-1 ring-black/10 shadow"
          src="/loopy.png"
          alt="Next.js logo"
          width={250}
          height={250}
          priority
        />

        <h1 className="text-3xl sm:text-[30px] font-bold text-center tracking-tight">{info.name}</h1>
        <hr className="w-48 sm:w-53 border-t border-dashed border-neutral-400"/>

        <ol className="font-mono list-inside list-decimal text-sm/6 text-center sm:text-left">
          <li className="mb-2 tracking-[-.03em]">
            개발자{" "}
            <code className="bg-black/[.05] dark:bg-white/[.06] font-mono font-semibold px-1 py-0.5 rounded">
	            {info.name}
            </code>
            입니다.
          </li>
          <li className="tracking-[-.01em]">
            깃허브 주소 
            <a
              href={info.github}
              target="_blank"
              rel="noopener noreferrer"
              className="ml-3 inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ring-neutral-300 hover:bg-neutral-50 transition"
            >
              GitHub →
            </a>
          </li>
        </ol>

        <section className="w-full max-w-xl">
          <h2 className="text-xs font-bold text-neutral-700 mb-3">{portfolio.projectInfo}</h2>
          <ul className="grid gap-4 sm:grid-cols-2">
            <li className="rounded-2xl border border-neutral-200 bg-white p-4 shadow-sm hover:shadow transition">  
              <p className="text-xs text-neutral-600 mb-3">
                {portfolio.projectName}
              </p>
              <a
                href={portfolio.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ring-1 ring-neutral-300 hover:bg-neutral-50 leading-none"
              >
                바로가기 <span aria-hidden className="ml-1">→</span>
              </a>
            </li>
          </ul>
        </section>
      </main>
      
    </div>
  );
}
