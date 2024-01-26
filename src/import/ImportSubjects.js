import Header from "../dashboard/Header";
import Footer from "../dashboard/Footer";
import ImportWizard from "./ImportWizzard";
export function ImportSubjects(props) {


    var columns = [{ Name: 'Subject', Database: 'String'}, 
                   { Name: 'Ident', Database: 'String'}, 
                   { Name: 'Uporabnik', Database: 'String'}, 
                   { Name: 'Else', Database: 'String'}]

    return (
        <div className="import subjects">
            <Header />


                <ImportWizard columns = {columns} />


            <Footer />
        </div>




    );
}