import { type ReactNode } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import VaxTrackLogo from "@/components/svgImages/VaxTrackLogo";

interface PasswordChangeLayoutProps {
    title: string;
    subtitle: string;
    children: ReactNode;
    backPath?: string;
    bottomLinkText?: string;
    bottomLinkPath?: string;
}

const PasswordChangeLayout = ({ 
    title, 
    subtitle, 
    children, 
    backPath, 
    bottomLinkText, 
    bottomLinkPath 
}: PasswordChangeLayoutProps) => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-[#F8F9FE] flex flex-col items-center justify-center p-4 font-sans">
            <div className="w-full max-w-105 bg-white rounded-[20px] p-8 border border-gray-100">
                
                {backPath && (
                    <button onClick={() => navigate(backPath)} className="text-[#7C3AED]">
                        <FiArrowLeft className="w-6 h-7" />
                    </button>
                )}
                
                <div className="flex items-center gap-2 mt-6">
                    <div className="bg-[#7C3AED] text-white p-2 rounded-[10px]">
                        <VaxTrackLogo />
                    </div>
                    <span className="text-[#7C3AED] font-medium text-lg">VaxTrack</span>
                </div>
                
                <h1 className="text-[28px] font-semibold mt-4 text-gray-900 tracking-tight">
                    {title}
                </h1>
                <p className="text-[#6B7280] text-[15px] mt-2">
                    {subtitle}
                </p>
                <div className="mt-8">
                    {children}
                </div>
                
                {bottomLinkText && bottomLinkPath && (
                    <div className="mt-8 pt-6 border-t border-gray-100 flex justify-center">
                        <Link
                            to={bottomLinkPath}
                            className="text-[#7C3AED] text-[15px] font-medium flex items-center gap-2"
                        >
                            <FiArrowLeft className="w-4 h-4" /> {bottomLinkText}
                        </Link>
                    </div>
                )}
            </div>
            <div className="mt-10 text-center max-w-75">
                <p className="text-[#9CA3AF] text-[13px] leading-relaxed">
                    Secure, medical-grade encryption for your family's health records.
                </p>
                <div className="flex justify-center gap-3 mt-4 opacity-40">
                    <div className="w-8 h-6 bg-gray-300 rounded-sm"></div>
                    <div className="w-8 h-6 bg-gray-300 rounded-sm"></div>
                </div>
            </div>
        </div>
    );
};

export default PasswordChangeLayout;