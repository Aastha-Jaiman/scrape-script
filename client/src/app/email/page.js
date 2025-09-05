import Navbar from "../../components/Navbar";
import EmailForm from "../../components/EmailForm";

export default function EmailPage() {
  return (
    <div>
      <Navbar />
      <main className="p-8">
        <h1 className="text-xl font-bold">Send Books via Email</h1>
        <EmailForm />
      </main>
    </div>
  );
}
