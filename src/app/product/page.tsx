import { Button } from "@/components/ui/button";

const ProductPage = () => {
  return (
    <div className="flex h-screen flex-col items-center justify-center bg-gray-100">
      <h1 className="text-color-primary flex text-6xl">Product Page</h1>
      <Button variant="default" className="mt-4">
        Click Me
      </Button>
    </div>
  );
};

export default ProductPage;
