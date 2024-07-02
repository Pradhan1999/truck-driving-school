import { createContext, useState, useEffect } from 'react';
import { fetchAllRoles } from 'services/roleAndPermission';

const context = {
  //   roles: {},
  //   setRoles: () => {},
  //   setLoading: false,
  //   loading: false,
  //   FetchRoles: () => {}
};

const RoleContext = createContext(context);

const RoleProvider = ({ children }: any) => {
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const FetchRoles = () => {
    fetchAllRoles({})?.then((res) => {
      setRoles(res?.rows);
    });
  };

  useEffect(() => {
    FetchRoles();
  }, []);

  return <RoleContext.Provider value={{ roles, loading, FetchRoles }}>{children}</RoleContext.Provider>;
};

export { RoleContext, RoleProvider };
