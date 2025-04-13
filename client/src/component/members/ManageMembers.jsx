    import React from 'react';
    import { FaTrashAlt } from 'react-icons/fa'; 
    import userAvatar from "../../assets/user-avatar.svg";

    const members = [
    { name: 'TT', email: 'thaotrinh@gmail.com', role: 'Manager' },
    { name: 'Alex Pfeiffer', email: 'alex@gmail.com', role: 'Front end developer' },
    { name: 'Mike Dean', email: 'mike@gmail.com', role: 'Front end developer' },
    { name: 'Mateus Cunha', email: 'cunha@gmail.com', role: 'Back end developer' },
    { name: 'Nzola Uemo', email: 'nzola@gmail.com', role: 'Back end developer' },
    { name: 'Antony Mack', email: 'mack@gmail.com', role: 'UI designer' },
    { name: 'André da Silva', email: 'andré@gmail.com', role: 'Quality Assurance' },
    ];

    const ManageMembers = () => {
    return (
        <div className="!p-6 bg-gray-50">
        <div className="flex justify-between items-center !mb-4">
            <h2 className="text-xl font-bold text-indigo-800">Manage team members</h2>
            <button className="bg-indigo-500 text-white !px-4 !py-2 rounded-lg hover:bg-indigo-600 transition">
            + Add member
            </button>
        </div>
        <table className="w-full bg-white rounded-lg shadow-lg overflow-hidden">
            <thead className="bg-gray-50 border-b">
            <tr>
                <th className="text-left !py-3 !px-4 font-medium">Name</th>
                <th className="text-left !py-3 !px-4 font-medium">Email address</th>
                <th className="text-left !py-3 !px-4 font-medium">Role</th>
                <th className="text-left !py-3 !px-4 font-medium">Delete</th>
            </tr>
            </thead>
            <tbody>
            {members.map((member, index) => (
                <tr key={index} className="border-b">
                <td className="!py-3 !px-4 flex items-center gap-3">
                    <img src={userAvatar} alt="avatar" className="!w-8 !h-8 rounded-full" />
                    <span>{member.name}</span>
                </td>
                <td className="!py-3 !px-4">{member.email}</td>
                <td className="!py-3 !px-4">{member.role}</td>
                <td className="!py-3 !px-4">
                    <button className="text-red-500 hover:text-red-700 transition">
                    <FaTrashAlt />
                    </button>
                </td>
                </tr>
            ))}
            </tbody>
        </table>
        </div>
    );
    };

    export default ManageMembers;
