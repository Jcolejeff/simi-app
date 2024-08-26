import { cn } from "lib/utils";
import Spinner from "@/components/ui/spinner";
interface IBtnLoader {
   children: React.ReactNode;
   isLoading: boolean;
   className?: string;
}

const BtnLoader = ({ className, isLoading, children }: IBtnLoader) => {
   return !isLoading ? <>{children}</> : <Spinner />;
};

export default BtnLoader;
