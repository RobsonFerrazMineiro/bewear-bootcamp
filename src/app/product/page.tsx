import { Button } from "@/components/ui/button";

const ProductPage = () => {
  return (
    <div className="flex h-screen flex-col items-center justify-center bg-gray-100">
      <h1 className="text-color-primary flex text-6xl">Product Page</h1>
      <Button className="bg-green-500 text-white hover:bg-green-600">
        Click Me
      </Button>
    </div>
  );
};

export default ProductPage;
