import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { useDispatch } from "react-redux";
import { ModalProvider, Modal } from "../context/Modal";
import { thunkAuthenticate } from "../store/session";
import Navigation from "../components/Navigation/Navigation";
import { ModalProvider as ModalProviderEx } from "../context/ModalEx";

//!!!!! Note. Modals were not working until I wrapped a new ModalProviderEx. Unknown why it does not work without it.


export default function Layout() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(thunkAuthenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <ModalProviderEx>
      <ModalProvider>
      <Navigation />
        {isLoaded && <Outlet />}
        <Modal />
      </ModalProvider>
      </ModalProviderEx>
    </>
  );
}

{/*  */}
