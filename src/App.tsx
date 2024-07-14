import { RouterProvider } from "react-router-dom";

// project import
import router from "routes";
import ThemeCustomization from "themes";

import Locales from "components/Locales";
// import RTLLayout from 'components/RTLLayout';
import ScrollTop from "components/ScrollTop";
import Snackbar from "components/@extended/Snackbar";

// auth-provider
import { JWTProvider as AuthProvider } from "contexts/JWTContext";
import { RoleProvider } from "contexts/rolePermission";

import Customization from "components/Customization";
import Notistack from "components/third-party/Notistack";

// ==============================|| APP - THEME, ROUTER, LOCAL  ||============================== //

export default function App() {
  return (
    <ThemeCustomization>
      {/* <RTLLayout> */}
      <Locales>
        <ScrollTop>
          <AuthProvider>
            <RoleProvider>
              <>
                <Notistack>
                  <RouterProvider router={router} />
                  <Customization />
                  <Snackbar />
                </Notistack>
              </>
            </RoleProvider>
          </AuthProvider>
        </ScrollTop>
      </Locales>
      {/* </RTLLayout> */}
    </ThemeCustomization>
  );
}
