import { useState, useEffect } from 'react';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Link, router, useForm, usePage } from '@inertiajs/react';
import { Transition } from '@headlessui/react';

export default function UpdateProfileInformation({ mustVerifyEmail, status, className = '' }) {
    const user = usePage().props.auth.user;
    const initialStatus = usePage().props.status;

    const [statusMessage, setStatusMessage] = useState(initialStatus);
    const [imagePreview, setImagePreview] = useState(user.profile_photo ? `/storage/${user.profile_photo}` : null);

    const { data, setData, patch, errors, processing, recentlySuccessful } = useForm({
        name: user.name,
        email: user.email,
        profile_photo: null,
    });

    useEffect(() => {
        if (data.name !== user.name || data.email !== user.email || data.profile_photo) {
            setStatusMessage("You need to save your changes.");
        } else {
            setStatusMessage(initialStatus);
        }
    }, [data, user, initialStatus]);

    const handleChange = (e) => {
        const key = e.target.name;
        const value = key === 'profile_photo' ? e.target.files[0] : e.target.value;
        setData(key, value);

        if (key === 'profile_photo' && e.target.files[0]) {
            setImagePreview(URL.createObjectURL(e.target.files[0]));
        }
    };

    const submit = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('name', data.name);
        formData.append('email', data.email);
        if (data.profile_photo) {
            formData.append('profile_photo', data.profile_photo);
        }

        router.post(route('profile.update'), formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
            onSuccess: () => {
                setStatusMessage('Profile updated successfully.');
            },
            onError: (errors) => {
                console.error('Failed to update profile:', errors);
            },
        });
    };

    const statusColor = statusMessage === "You need to save your changes." ? 'text-yellow-500' : 'text-green-600';

    return (
        <section className={className}>
            <header>
                <h2 className="text-lg font-medium text-gray-900">Profile Information</h2>

                <p className="mt-1 text-sm text-gray-600">
                    Update your account's profile information and email address.
                </p>
            </header>

            {statusMessage && (
                <div className={`mb-4 text-sm font-medium ${statusColor}`}>
                    {statusMessage}
                </div>
            )}

            <form onSubmit={submit} className="mt-6 space-y-6" encType="multipart/form-data">
                <div>
                    <InputLabel htmlFor="name" value="Name" />

                    <TextInput
                        id="name"
                        name="name"
                        className="mt-1 block w-full"
                        value={data.name}
                        onChange={handleChange}
                        required
                        isFocused
                        autoComplete="name"
                    />

                    <InputError className="mt-2" message={errors.name} />
                </div>

                <div>
                    <InputLabel htmlFor="email" value="Email" />

                    <TextInput
                        id="email"
                        name="email"
                        type="email"
                        className="mt-1 block w-full"
                        value={data.email}
                        onChange={handleChange}
                        required
                        autoComplete="username"
                    />

                    <InputError className="mt-2" message={errors.email} />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="profile_photo" value="Profile Photo" />

                    {imagePreview && (
                        <div className="mt-2">
                            <img
                                src={imagePreview}
                                alt="Profile Photo"
                                className="h-16 w-16 rounded-full object-cover"
                            />
                        </div>
                    )}

                    <input
                        id="profile_photo"
                        type="file"
                        name="profile_photo"
                        className="mt-1 block w-full"
                        onChange={handleChange}
                    />

                    <InputError className="mt-2" message={errors.profile_photo} />
                </div>

                {mustVerifyEmail && user.email_verified_at === null && (
                    <div>
                        <p className="text-sm mt-2 text-gray-800">
                            Your email address is unverified.
                            <Link
                                href={route('verification.send')}
                                method="post"
                                as="button"
                                className="underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                Click here to re-send the verification email.
                            </Link>
                        </p>

                        {status === 'verification-link-sent' && (
                            <div className="mt-2 font-medium text-sm text-green-600">
                                A new verification link has been sent to your email address.
                            </div>
                        )}
                    </div>
                )}

                <div className="flex items-center gap-4">
                    <PrimaryButton disabled={processing}>Save</PrimaryButton>

                    <Transition
                        show={recentlySuccessful}
                        enter="transition ease-in-out"
                        enterFrom="opacity-0"
                        leave="transition ease-in-out"
                        leaveTo="opacity-0"
                    >
                        <p className="text-sm text-gray-600">Saved.</p>
                    </Transition>
                </div>
            </form>
        </section>
    );
}
// Compare this snippet from resources/js/Components/PrimaryButton.jsx:
