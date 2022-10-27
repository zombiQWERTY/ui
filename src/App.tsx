import { Button } from "./components/Button";
import { Modal } from "./components/Modal";
import { useModal } from "./components/Modal/hooks/useModal";

function App() {
  const { isShowing, toggle } = useModal();

  return (
    <div>
      <Button bgColor="blue" onClick={toggle}>
        Open Modal
      </Button>
      <Modal
        isShowing={isShowing}
        toggle={toggle}
        title="Title"
        content="Description"
      />
    </div>
  );
}

export default App;
