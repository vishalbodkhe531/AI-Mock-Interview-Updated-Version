import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <section className="min-h-screen w-full flex flex-col lg:flex-row">
      <div className="hidden lg:flex lg:w-1/2 items-center justify-center">
        <div className="p-6 sm:p-10 lg:p-16 max-w-xl">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold">
            Welcome Back to Squid 🦑
          </h2>
          <p className="mt-4 text-base sm:text-lg leading-relaxed text-muted-foreground">
            Get ready for your dream job with our AI-powered mock interview
            platform. Practice common questions, receive instant feedback, and
            boost your confidence for real interviews.
          </p>
        </div>
      </div>

      <div className="flex flex-col justify-center items-center w-full lg:w-1/2 px-4 sm:px-8 py-12">
        <div className="block lg:hidden mb-8 text-center">
          <div className="flex justify-center items-center gap-4">
            <a
              className="inline-flex size-12 sm:size-16 items-center justify-center rounded-full bg-accent text-primary"
              href="/"
            >
              <span className="sr-only">Home</span>
              <svg
                className="h-6 sm:h-8"
                viewBox="0 0 28 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M0.41 10.3847C1.14777 7.4194..." fill="currentColor" />
              </svg>
            </a>
            <h1 className="text-xl sm:text-2xl font-bold">
              Welcome Back to Squid 🦑
            </h1>
          </div>
          <p className="mt-4 text-sm text-muted-foreground">
            Prepare smartly for your next job interview with real-time practice
            and AI insights.
          </p>
        </div>

        <div className="w-full max-w-md">
          <SignIn />
        </div>
      </div>
    </section>
  );
}
