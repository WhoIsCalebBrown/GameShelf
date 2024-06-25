import {Head, Link} from '@inertiajs/react';
import {ChevronRightIcon} from '@heroicons/react/20/solid';


export default function Welcome({ auth }) {
    return (
        <>
            <Head title="Welcome"/>
            <div
                className="relative sm:flex sm:justify-center sm:items-center min-h-screen bg-dots-darker bg-center bg-gray-100 dark:bg-dots-lighter dark:bg-gray-900 selection:bg-red-500 selection:text-white">
                {/*Parent styles causing nav to not show when un-auth*/}
                <div className="z-50 sm:fixed sm:top-0 sm:right-0 p-6 text-end">
                    {auth.user ? (
                        <Link
                            href={route('dashboard')}
                            className="font-semibold text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white focus:outline focus:outline-2 focus:rounded-sm focus:outline-red-500"
                        >
                            Dashboard
                        </Link>

                    ) : (
                        <>
                            <Link
                                href={route('login')}
                                className="font-semibold text-gray-600 hover:text-gray-900 dark:text-white dark:hover:text-white focus:outline focus:outline-2 focus:rounded-sm focus:outline-red-500"
                            >
                                Log in
                            </Link>

                            <Link
                                href={route('register')}
                                className="ms-4 font-semibold text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white focus:outline focus:outline-2 focus:rounded-sm focus:outline-red-500"
                            >
                                Register
                            </Link>
                        </>
                    )}
                </div>

                {!auth.user && (
                    <div className="relative isolate overflow-hidden bg-gray-900 w-full">
                        <svg
                            className="absolute inset-0 -z-10 h-full w-full stroke-white/10 [mask-image:radial-gradient(100%_100%_at_top_right,white,transparent)]"
                            aria-hidden="true"
                        >
                            <defs>
                                <pattern
                                    id="983e3e4c-de6d-4c3f-8d64-b9761d1534cc"
                                    width={200}
                                    height={200}
                                    x="50%"
                                    y={-1}
                                    patternUnits="userSpaceOnUse"
                                >
                                    <path d="M.5 200V.5H200" fill="none"/>
                                </pattern>
                            </defs>
                            <svg x="50%" y={-1} className="overflow-visible fill-gray-800/20">
                                <path
                                    d="M-200 0h201v201h-201Z M600 0h201v201h-201Z M-400 600h201v201h-201Z M200 800h201v201h-201Z"
                                    strokeWidth={0}
                                />
                            </svg>
                            <rect width="100%" height="100%" strokeWidth={0}
                                  fill="url(#983e3e4c-de6d-4c3f-8d64-b9761d1534cc)"/>
                        </svg>
                        <div
                            className="absolute left-[calc(50%-4rem)] top-10 -z-10 transform-gpu blur-3xl sm:left-[calc(50%-18rem)] lg:left-48 lg:top-[calc(50%-30rem)] xl:left-[calc(50%-24rem)]"
                            aria-hidden="true"
                        >
                            <div
                                className="aspect-[1108/632] w-[69.25rem] bg-gradient-to-r from-[#80caff] to-[#4f46e5] opacity-20"
                                style={{
                                    clipPath:
                                        'polygon(73.6% 51.7%, 91.7% 11.8%, 100% 46.4%, 97.4% 82.2%, 92.5% 84.9%, 75.7% 64%, 55.3% 47.5%, 46.5% 49.4%, 45% 62.9%, 50.3% 87.2%, 21.3% 64.1%, 0.1% 100%, 5.4% 51.1%, 21.4% 63.9%, 58.9% 0.2%, 73.6% 51.7%)',
                                }}
                            />
                        </div>
                        <div className="mx-auto max-w-7xl px-6 pb-24 pt-10 sm:pb-32 lg:flex lg:px-8 lg:py-40">
                            <div className="mx-auto max-w-2xl flex-shrink-0 lg:mx-0 lg:max-w-xl lg:pt-8">
                                <div className="mt-24 sm:mt-32 lg:mt-16">
                                    <svg version="1.1" id="_x32_" xmlns="http://www.w3.org/2000/svg"
                                         xmlns:xlink="http://www.w3.org/1999/xlink"
                                         viewBox="0 0 512 512" xml:space="preserve" height={50} width={50}
                                         className={'fill-current text-purple-500 mb-3'}>
                                        <g>
                                            <rect x="36.823" y="215.559" className="st0" fill="currentColor" width="73.646"
                                                height="18.412"/>
                                            <rect x="36.823" y="141.912" className="st0" fill="currentColor" width="73.646"
                                                height="36.823"/>
                                            <rect x="165.704" y="215.559" className="st0" fill="currentColor" width="73.646"
                                                height="18.412"/>
                                            <rect x="165.704" y="141.912" className="st0" fill="currentColor" width="73.646"
                                                height="36.823"/>
                                            <path className="st0" fill="currentColor" d="M510.067,401.059L403.032,66.108c-5.512-17.206-21.41-28.193-38.577-28.193c-4.081,0-8.244,0.63-12.325,1.933
                                                l-0.023,0.008l-63.114,20.156c-5.853,1.879-10.91,5.026-15.135,8.945c-5.434-15.976-20.389-27.536-38.203-27.546h-66.256
                                                c-12.694,0.009-23.882,5.96-31.312,15.094c-7.43-9.134-18.619-15.085-31.312-15.094H40.518C18.137,41.422,0.005,59.545,0,81.931
                                                v351.635c0.005,22.386,18.137,40.509,40.518,40.518h66.256c12.694-0.009,23.882-5.961,31.312-15.094
                                                c7.43,9.134,18.619,15.085,31.312,15.094h66.256c22.381-0.009,40.514-18.132,40.518-40.518V153.015l93.591,292.887
                                                c5.52,17.206,21.419,28.192,38.59,28.183c4.09,0,8.262-0.63,12.334-1.924l63.119-20.174c17.207-5.51,28.202-21.405,28.193-38.576
                                                C512,409.312,511.38,405.14,510.067,401.059z M128.881,433.566c-0.022,12.209-9.903,22.08-22.107,22.107H40.518
                                                c-12.204-0.026-22.085-9.898-22.107-22.107V81.931c0.022-12.208,9.903-22.089,22.107-22.107h66.256
                                                c12.204,0.018,22.084,9.898,22.107,22.107V433.566z M257.762,433.566c-0.022,12.209-9.903,22.08-22.107,22.107h-66.256
                                                c-12.204-0.026-22.084-9.898-22.106-22.107V81.931c0.022-12.208,9.902-22.089,22.106-22.107h66.256
                                                c12.204,0.018,22.085,9.898,22.107,22.107V433.566z M478.197,434.457l-63.11,20.164c-2.256,0.72-4.513,1.052-6.733,1.052
                                                c-9.34-0.009-18.061-5.987-21.055-15.382L280.268,105.341c-0.724-2.256-1.056-4.513-1.056-6.733
                                                c0.005-9.341,5.988-18.061,15.386-21.054l63.11-20.166h0.009c2.252-0.719,4.509-1.06,6.738-1.06
                                                c9.337,0.009,18.052,5.988,21.046,15.391l107.035,334.95c0.72,2.257,1.052,4.513,1.052,6.743
                                                C493.579,422.742,487.601,431.463,478.197,434.457z"/>
                                            <path className="st0" fill="currentColor"
                                                d="M352.099,39.857c0.013,0,0.022,0,0.031-0.008l1.061-0.342L352.099,39.857z"/>
                                            <polygon className="st0" fill="currentColor"
                                                    points="338.484,227.03 344.085,244.561 414.242,222.148 408.633,204.608 	"/>
                                            <polygon className="st0" fill="currentColor"
                                                    points="386.211,134.459 316.062,156.872 327.273,191.951 397.422,169.53 	"/>
                                        </g>
                                    </svg>
                                </div>

                                <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
                                    Your Ultimate Gaming Library
                                </h1>

                                <p className="mt-6 text-lg leading-8 text-gray-300">
                                    Discover, track, and share your favorite games all in one place. From the latest
                                    releases to classic gems,
                                    GameShelf brings your gaming passions together seamlessly.
                                    Join our community and elevate your gaming experience.
                                </p>

                                <div className="mt-10 flex items-center gap-x-6">
                                    <a
                                        href={route('login')}
                                        className="rounded-md bg-indigo-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-400"
                                    >
                                        Create an Account
                                    </a>
                                    <a href="#" className="text-sm font-semibold leading-6 text-white">
                                        Learn more <span aria-hidden="true">→</span>
                                    </a>
                                </div>
                            </div>
                            <div
                                className="mx-auto mt-16 flex max-w-2xl sm:mt-24 lg:ml-10 lg:mr-0 lg:mt-0 lg:max-w-none lg:flex-none xl:ml-32">
                                <div className="max-w-3xl flex-none sm:max-w-5xl lg:max-w-none">
                                    <img
                                        src="/images/RetroGameCovers.webp"
                                        alt="App screenshot"
                                        width={2432}
                                        height={1442}
                                        className="w-[76rem] rounded-md bg-white/5 shadow-2xl ring-1 ring-white/10"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            <style>{`
                .bg-dots-darker {
                    background-image: url("data:image/svg+xml,%3Csvg width='30' height='30' viewBox='0 0 30 30' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1.22676 0C1.91374 0 2.45351 0.539773 2.45351 1.22676C2.45351 1.91374 1.91374 2.45351 1.22676 2.45351C0.539773 2.45351 0 1.91374 0 1.22676C0 0.539773 0.539773 0 1.22676 0Z' fill='rgba(0,0,0,0.07)'/%3E%3C/svg%3E");
                }
                @media (prefers-color-scheme: dark) {
                    .dark\\:bg-dots-lighter {
                        background-image: url("data:image/svg+xml,%3Csvg width='30' height='30' viewBox='0 0 30 30' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1.22676 0C1.91374 0 2.45351 0.539773 2.45351 1.22676C2.45351 1.91374 1.91374 2.45351 1.22676 2.45351C0.539773 2.45351 0 1.91374 0 1.22676C0 0.539773 0 0 1.22676 0Z' fill='rgba(255,255,255,0.07)'/%3E%3C/svg%3E");
                    }
                }
            `}</style>
        </>
    );
}
