import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <section>
      <div className="lg:grid lg:min-h-screen lg:grid-cols-12">
        <section className="relative hidden lg:flex lg:col-span-5 xl:col-span-6 ">
          <div className="flex flex-col justify-center p-12 w-full h-full">
            <h2 className="text-3xl font-bold sm:text-4xl md:text-5xl">
              Welcome Back to Squid 🦑
            </h2>
            <p className="mt-4 text-lg leading-relaxed ">
              Get ready for your dream job with our AI-powered mock interview
              platform. Practice common questions, receive instant feedback, and
              boost your confidence for real interviews.
            </p>
          </div>
        </section>

        <main className="flex items-center justify-center px-6 py-10 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6">
          <div className="w-full max-w-xl lg:max-w-3xl">
            <div className="block lg:hidden mb-8">
              <div className="flex items-center gap-4">
                <a
                  className="inline-flex size-12 sm:size-16 items-center justify-center rounded-full "
                  href="/"
                >
                  <span className="sr-only">Home</span>
                  <svg
                    className="h-6 sm:h-8"
                    viewBox="0 0 28 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M0.41 10.3847C1.14777 7.4194..."
                      fill="currentColor"
                    />
                  </svg>
                </a>
                <h1 className="text-xl font-bold sm:text-2xl">
                  Welcome Back to Squid 🦑
                </h1>
              </div>

              <p className="mt-4 text-sm ">
                Prepare smartly for your next job interview with real-time
                practice and AI insights.
              </p>
            </div>

            <div>
              <SignIn />
            </div>
          </div>
        </main>
      </div>
    </section>
  );
}
