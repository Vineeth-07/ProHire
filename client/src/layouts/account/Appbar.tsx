import { Fragment } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { UserCircleIcon } from "@heroicons/react/24/outline";
import logo from "../../assets/images/logo.png";
import { Link } from "react-router-dom";

const Appbar = () => {
  return (
    <Disclosure as="nav" className="bg-white shadow">
      {({}) => (
        <>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16 items-center">
              <div className="flex items-center">
                <Link to={"/"}>
                  <img
                    className="hidden lg:block h-16 w-16 mr-4"
                    src={logo}
                    alt="Logo"
                  />
                </Link>
                <Link to={"/"}>
                  <span className="text-3xl font-bold text-gray-800">
                    ProHire
                  </span>
                </Link>
              </div>
              <div className="hidden sm:ml-6 sm:flex sm:items-center">
                <div className="ml-3 relative">
                  <Menu>
                    {({ open }) => (
                      <>
                        <div>
                          <Menu.Button className="inline-flex items-center justify-center w-full rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-100">
                            <UserCircleIcon className="h-6 w-6 mr-1" />
                            <span>Account</span>
                          </Menu.Button>
                        </div>
                        <Transition
                          show={open}
                          as={Fragment}
                          enter="transition ease-out duration-100"
                          enterFrom="transform opacity-0 scale-95"
                          enterTo="transform opacity-100 scale-100"
                          leave="transition ease-in duration-75"
                          leaveFrom="transform opacity-100 scale-100"
                          leaveTo="transform opacity-0 scale-95"
                        >
                          <Menu.Items
                            static
                            className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
                          >
                            <div className="py-1">
                              <Menu.Item>
                                {({ active }) => (
                                  <Link
                                    to="/profile"
                                    className={`${
                                      active
                                        ? "bg-gray-100 text-gray-900"
                                        : "text-gray-700"
                                    } block px-4 py-2 text-sm`}
                                  >
                                    Your Profile
                                  </Link>
                                )}
                              </Menu.Item>
                              <Menu.Item>
                                {({ active }) => (
                                  <Link
                                    to="/logout"
                                    className={`${
                                      active
                                        ? "bg-gray-100 text-gray-900"
                                        : "text-gray-700"
                                    } block px-4 py-2 text-sm`}
                                  >
                                    Signout
                                  </Link>
                                )}
                              </Menu.Item>
                            </div>
                          </Menu.Items>
                        </Transition>
                      </>
                    )}
                  </Menu>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </Disclosure>
  );
};

export default Appbar;
