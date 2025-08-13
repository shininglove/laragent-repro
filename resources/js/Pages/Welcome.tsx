import { Head } from '@inertiajs/react';
import axios from 'axios';
import { useState } from 'react';

export default function Welcome() {
    const [message, setMessage] = useState('');
    const [response, setResponse] = useState('');

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        axios.post('/chat', { message })
            .then(response => {
                const reader = response.data.body.getReader();
                const decoder = new TextDecoder();

                function read() {
                    return reader.read().then(({ done, value }: { done: boolean, value: Uint8Array }) => {
                        if (done) return;

                        const text = decoder.decode(value);
                        setResponse(prev => prev + text);

                        return read();
                    });
                }

                return read();
            })
            .catch(error => console.error('Error:', error));
    };

    return (
        <>
            <Head title="Home" />
            <div className="bg-gradient-to-b from-slate-50 dark:from-black to-white dark:to-neutral-950 min-h-screen text-black dark:text-white">
                <div className="mx-auto px-4 sm:px-6 lg:px-8 py-12 max-w-3xl">
                    <div className="flex flex-col items-center text-center">
                        <h1 className="bg-clip-text bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 font-extrabold text-transparent text-4xl sm:text-5xl tracking-tight">Welcome</h1>
                        <p className="mt-3 text-gray-600 dark:text-gray-300 text-base sm:text-lg">Chat with the agent below.</p>
                    </div>

                    <div className="bg-white/70 dark:bg-neutral-900/70 shadow-xl backdrop-blur mt-8 p-6 sm:p-8 border border-gray-200 dark:border-neutral-800 rounded-2xl">
                        <form onSubmit={handleSubmit} className="flex gap-3">
                            <label htmlFor="message" className="sr-only">Message</label>
                            <input
                                id="message"
                                type="text"
                                value={message}
                                onChange={e => setMessage(e.target.value)}
                                placeholder="Type your message..."
                                className="flex-1 bg-white dark:bg-neutral-800 shadow-sm px-4 py-3 border border-gray-300 focus:border-indigo-500 dark:border-neutral-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-900 dark:text-gray-100 placeholder-gray-400"
                            />
                            <button
                                type="submit"
                                className="bg-indigo-600 hover:bg-indigo-500 shadow px-5 py-3 rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 font-medium text-white shrink-0"
                            >
                                Send
                            </button>
                        </form>

                        <div className="mt-6">
                            <div className="font-medium text-gray-500 dark:text-gray-400 text-sm">Response</div>
                            <div className="bg-gray-50 dark:bg-neutral-900 mt-2 p-4 border border-gray-200 dark:border-neutral-800 rounded-xl min-h-[120px] max-h-96 overflow-auto text-gray-800 dark:text-gray-200 text-sm leading-relaxed whitespace-pre-wrap">
                                {response || 'Awaiting response...'}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}


