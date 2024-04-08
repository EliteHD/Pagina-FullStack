import { Typography } from "@material-tailwind/react";

function Footer() {
    const linkedinLink = "https://www.linkedin.com/in/josias-dominguez-915a63253/";
    const githubLink = "https://github.com/EliteHD";
    const githubTest = "https://github.com/justjairo/Prueba-Tecnica";
    const whatsappLink = "https://wa.me/+5219514238758";

    return (
        <footer className="bg-white text-white p-4 text-center fixed bottom-0 w-full z-50 flex  flex-row flex-wrap items-center justify-center gap-y-6 gap-x-12 border-t border-blue-gray-50 py-6  md:justify-between">
            <Typography color="blue-gray" className="font-normal" >
                <a href={githubTest}>Prueba Técnica Karimnot</a>
            </Typography>
            <ul className="flex flex-wrap items-center gap-y-2 gap-x-8">
                <li>
                    <a
                        href={linkedinLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="transition-colors text-blue-600 hover:text-blue-200 focus:text-blue-200"
                    >
                        LinkedIn
                    </a>
                </li>
                <li>
                    <a
                        href={githubLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="transition-colors text-purple-500 hover:text-purple-200 focus:text-purple-200"
                    >
                        GitHub
                    </a>
                </li>
                <li>
                    <a
                        href={whatsappLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="transition-colors text-green-500 hover:text-green-200 focus:text-green-200"
                    >
                        WhatsApp
                    </a>
                </li>
            </ul>
        </footer>
    );
}

export default Footer;

