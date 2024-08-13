import React, {Fragment} from 'react';
import {Dialog, Transition} from "@headlessui/react";

const DescriptionModal = ({ isOpen, onClose, game }) => {
    return (
        <Transition
            show={isOpen}
            enter="transition duration-500 ease-out"
            enterFrom="transform scale-95 opacity-0"
            enterTo="transform scale-100 opacity-100"
            leave="transition duration-500 ease-out"
            leaveFrom="transform scale-100 opacity-100"
            leaveTo="transform scale-95 opacity-0"
            as={Fragment}>
            <Dialog open={isOpen} onClose={onClose} className="fixed inset-0 z-50 flex items-center justify-center p-4">
                <div
                    className={`fixed inset-0 bg-black transition-opacity duration-3000 ${isOpen ? 'opacity-50' : 'opacity-0'}`}/>
                <Dialog.Panel className={"bg-white rounded-lg p-6 max-w-lg mx-auto z-50"}>
                    <Dialog.Title className={"text-2xl font-bold mb-4"}>{game.name}</Dialog.Title>
                    <p className="mb-4">{game.description}</p>
                    <button
                        onClick={onClose}
                        className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
                    >
                        Close
                    </button>
                </Dialog.Panel>
            </Dialog>
        </Transition>
    );
};

export default DescriptionModal;
