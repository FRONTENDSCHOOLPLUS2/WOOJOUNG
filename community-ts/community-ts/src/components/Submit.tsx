import Button from "@components/Button";

interface Submit {
  children: React.ReactNode;
}

const Submit: React.FC<Submit> = function Submit({ children, ...rest }) {
  return (
    <Button type="submit" {...rest}>
      {children}
    </Button>
  );
};

export default Submit;
