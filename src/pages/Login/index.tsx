import { Link } from 'react-router';
import AuthLayout from '../../components/ui/AuthLayout';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';

const LoginPage = () => {
  return (
    <AuthLayout>
      <form className="w-[400px]">
        <h1 className="text-center">Ulogiraj se!</h1>
        <Input placeholder="Email" value="" className="mb-2 mt-2" />
        <Input placeholder="Lozinka" value="" />
        <Button onClick={() => {}} className="w-full mt-2" type="primary">
          Ulogiraj se
        </Button>
        <Link to="/signup" className="text-center block mt-2 underline">
          Registriraj se!
        </Link>
      </form>
    </AuthLayout>
  );
};

export default LoginPage;
