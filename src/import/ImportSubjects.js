import Header from "../dashboard/Header";
import Footer from "../dashboard/Footer";
import ImportWizard from "./ImportWizzard";
export function ImportSubjects(props) {


    var columns = ["Subjekt", "Ident", "Barkod", "Korisnik"]
    
    return (
        <div className="import subjects">
            <Header />


                <ImportWizard columns = {columns} />


            <Footer />
        </div>




    );
}