import { Fragment, ReactNode } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { CircleX } from "lucide-react";

interface Props {
  header?: ReactNode;
  body: ReactNode;
  footer?: ReactNode;
  isOpen: boolean;
  onCloseHandler: () => void;
}

const ModalComponent: React.FC<Props> = (props) => {
  return (
    <Transition.Root show={props.isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-50 bg-red-400"
        onClose={() => {}}
        onClick={props.onCloseHandler}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-900/50 bg-opacity-50 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform py-8 px-16 overflow-hidden rounded-xl bg-white text-left shadow-xl transition-all md:w-4/5 lg:w-1/2 w-full mx-auto md:mt-16 md:mb-32 my-auto">
                {/* cja: modal header (start) */}
                <button
                  onClick={props.onCloseHandler}
                  className="absolute right-4 top-4 cursor-pointer"
                >
                  <CircleX className="w-7 h-7 text-red-600" />
                </button>

                {props.header}

                {/* cja: modal header (end) */}
                {/* cja: modal body (start) */}
                {props.body}
                {/* cja: modal body (end) */}
                {/* cja: modal footer (start) */}
                {props.footer}
                {/* cja: modal footer (end) */}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default ModalComponent;
