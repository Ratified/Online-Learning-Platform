// Profile.tsx
import React, { useEffect, useState } from 'react';
import { getUserData, updateProfile } from '../services/authService';

const Profile = () => {
    const [user, setUser] = useState<{ name: string; email: string } | null>(null);
    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [message, setMessage] = useState<string>('');
    const token = localStorage.getItem('token'); // Assuming you're storing the JWT in localStorage

    useEffect(() => {
        const fetchUserData = async () => {
            if (token) {
                try {
                    const userData = await getUserData(token);
                    setUser(userData);
                    setName(userData.name);
                    setEmail(userData.email);
                } catch (error) {
                    console.error('Error fetching user data:', error);
                }
            }
        };
        fetchUserData();
    }, [token]);

    const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!token) return;

        const updatedData = { name, email, password };

        try {
            const updatedUser = await updateProfile(updatedData, token);
            setMessage('Profile updated successfully!');
            setUser(updatedUser);
            setName(updatedUser.name);
            setEmail(updatedUser.email);
            setPassword(''); // Clear password field
        } catch (error) {
            setMessage('Failed to update profile');
            console.error(error);
        }
    };

    return (
        <div className="profile-container">
            <h2>User Profile</h2>
            {message && <p>{message}</p>}
            {user ? (
                <form onSubmit={handleUpdate}>
                    <div>
                        <label>Name:</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label>Email:</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label>Password:</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <small>Leave blank to keep the same password</small>
                    </div>
                    <button type="submit">Update Profile</button>
                </form>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default Profile;
