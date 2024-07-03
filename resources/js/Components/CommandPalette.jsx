import {
    Combobox,
    ComboboxInput,
    ComboboxOption,
    ComboboxOptions,
    Dialog,
    DialogPanel,
    DialogBackdrop,
} from '@headlessui/react';
import { MagnifyingGlassIcon } from '@heroicons/react/20/solid';
import { useState, useEffect } from 'react';

const commands = [
    { id: 1, name: 'Open Settings', action: () => alert('Settings opened!') },
    { id: 2, name: 'Go to Home', action: () => alert('Navigated to Home!') },
    // Add more commands...
];

function classNames(...classes) {
    return classes.filter(Boolean).join(' ');
}

export default function CommandPalette() {
    const [query, setQuery] = useState('');
    const [open, setOpen] = useState(false);

    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === 'k' && (event.ctrlKey || event.metaKey)) {
                setOpen((prevOpen) => !prevOpen);
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, []);

    const filteredCommands =
        query === ''
            ? []
            : commands.filter((command) =>
                command.name.toLowerCase().includes(query.toLowerCase())
            );

    return (
        <div>
            <button onClick={() => setOpen(true)}>Open Command Palette</button>
            <Dialog
                className="relative z-50"
                open={open}
                onClose={() => {
                    setOpen(false);
                    setQuery('');
                }}
            >
                <DialogBackdrop
                    className="fixed inset-0 bg-gray-900 bg-opacity-50 backdrop-blur-sm"
                />
                <div className="fixed inset-0 z-50 flex items-start justify-center p-4 sm:p-6 md:p-20">
                    <DialogPanel
                        className="w-full max-w-xl mt-20 transform overflow-hidden rounded-xl bg-white bg-opacity-80 backdrop-blur-lg shadow-2xl ring-1 ring-black ring-opacity-5"
                    >
                        <Combobox
                            onChange={(command) => {
                                if (command) {
                                    command.action();
                                    setOpen(false);
                                }
                            }}
                        >
                            <div className="relative">
                                <MagnifyingGlassIcon
                                    className="pointer-events-none absolute left-4 top-3.5 h-5 w-5 text-gray-400"
                                    aria-hidden="true"
                                />
                                <ComboboxInput
                                    autoFocus
                                    className="h-12 w-full border-0 bg-transparent pl-11 pr-4 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm"
                                    placeholder="Search commands..."
                                    onChange={(event) => setQuery(event.target.value)}
                                />
                            </div>
                            {filteredCommands.length > 0 && (
                                <ComboboxOptions className="max-h-72 scroll-py-2 overflow-y-auto py-2 text-sm text-gray-800">
                                    {filteredCommands.map((command) => (
                                        <ComboboxOption
                                            key={command.id}
                                            value={command}
                                            className={({ active }) =>
                                                classNames(
                                                    'cursor-default select-none px-4 py-2',
                                                    active && 'bg-indigo-600 text-white'
                                                )
                                            }
                                        >
                                            {command.name}
                                        </ComboboxOption>
                                    ))}
                                </ComboboxOptions>
                            )}
                            {query !== '' && filteredCommands.length === 0 && (
                                <p className="p-4 text-sm text-gray-500">No commands found.</p>
                            )}
                        </Combobox>
                    </DialogPanel>
                </div>
            </Dialog>
        </div>
    );
}
