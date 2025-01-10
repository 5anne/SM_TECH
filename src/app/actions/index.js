'use server'

import { signIn, signOut } from '@/../auth';

export async function doSocialLogin(formData) {
    const action = formData.get('action');
    await signIn(action, { redirectTo: '/' });
}

export async function doLogout() {
    await signOut({ redirectTo: '/' });
}

export async function doCredentialsLogIn(formData) {
    try {
        const response = await signIn("credentials", {
            email: formData.email,
            password: formData.password,
            redirect: false
        });
        return response;
    } catch (err) {
        console.error("Error during login:", err);
        throw new Error("Invalid Credentials");
    }
}
