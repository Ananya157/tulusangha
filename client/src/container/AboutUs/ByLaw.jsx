import pdf from "../../assets/documents/aata_constitution_and_bylaws.pdf";
import Viewer, { Worker } from '@phuocng/react-pdf-viewer';
import '@phuocng/react-pdf-viewer/cjs/react-pdf-viewer.css';
import "../../styles/home.scss";

export const ByLaw = () => {
    return (
        <div>
            <h1 className="homeHeader marginBorder newsletter">
                By-Law of All American Tulu Association
           </h1>
            <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.6.347/build/pdf.worker.min.js">
                <div id="pdfviewer">
                    <Viewer fileUrl={pdf} />
                </div>
            </Worker>
        </div>
    );
}
