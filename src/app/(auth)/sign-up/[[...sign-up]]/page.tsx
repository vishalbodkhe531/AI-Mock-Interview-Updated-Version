import { SignUp } from "@clerk/nextjs";

export default function Page() {
  return (
    <section>
      <div className="lg:grid lg:min-h-screen lg:grid-cols-12">
        <section className="relative flex h-32 items-end  lg:col-span-5 lg:h-full xl:col-span-6">
          <div className="hidden lg:flex h-full w-full flex-col justify-center  p-12 ">
            <h2 className="text-3xl font-bold sm:text-4xl md:text-5xl">
              Welcome to Squid 🦑
            </h2>
            <p className="mt-4 text-lg leading-relaxed">
              Get ready for your dream job with our AI-powered mock interview
              platform. Practice common questions, receive instant feedback, and
              boost your confidence for real interviews.
            </p>
          </div>
        </section>

        <main className="flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6">
          <div className="w-full max-w-xl lg:max-w-3xl">
            <div className="relative -mt-16 block lg:hidden">
              <a
                className="inline-flex size-16 items-center justify-center rounded-full  text-blue-600 sm:size-20"
                href="#"
              >
                <span className="sr-only">Home</span>
                <svg
                  className="h-8 sm:h-10"
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
            </div>

            <div className="mt-8">
              <SignUp />
            </div>
          </div>
        </main>
      </div>
    </section>
  );
}
