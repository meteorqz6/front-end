import PageLayout from "../components/layout/PageLayout";
import BackIcon from "../components/icons/BackIcon";
import { useNavigate } from "react-router";
import { useState } from "react";
import ResetPasswordForm from "@/components/ResetPassword/ResetPasswordForm";
import TemporaryPassword from "@/components/ResetPassword/TemporaryPasswordModal";

const ResetPasswordPage = () => {
    const navigate = useNavigate();
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleComfirm = () => {
        setIsModalOpen(false);
        navigate('/login');
    };

    return (
        <PageLayout leftButton={<button onClick={() => navigate(-1)}><BackIcon /></button>} customFooter={null}>
            <div className="flex flex-col w-full h-content p-8">
                <ResetPasswordForm setIsModalOpen={setIsModalOpen} />
                <TemporaryPassword isOpen={isModalOpen} onConfirm={handleComfirm} />
            </div>
        </PageLayout>
    );
};

export default ResetPasswordPage;
