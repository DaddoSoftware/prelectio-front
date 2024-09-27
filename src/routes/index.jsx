import { Route, Routes, useLocation } from "react-router";
import { Layout } from "../components/layout";
import { Home, RegisterDeportista } from "../pages";
import { ForgotPassword } from "../pages/auth/forgotPassword";
import { Login } from "../pages/auth/login";
import { AnimatePresence } from "framer-motion";
import { ChangePass } from "../pages/auth/changePass";
import { Register } from "../pages/auth/register";
import { RecruiterRegister } from "../pages/recruiter/recruiterRegister";
import ProtectedRoute from "./protectedRoute";
import { NotFound } from "../pages/general/notFound";
import { LayoutUser } from "../components/layout/user/layoutUser";
import { AdminHome } from "../pages/admin/adminHome";
import { AdminRecruiters } from "../pages/admin/adminRecruiters";
import { AdminRecruiterDetail } from "../pages/admin/adminRecruiterDetail";
import { AdminAthletes } from "../pages/admin/adminAthletes";
import { AthleteMessages } from "../pages/athlete/athleteMessages";
import { LayoutRecruiter } from "../components/layout/recruiter/layoutRecruiter";
import { RecruiterMessages } from "../pages/recruiter/recruiterMessages";
import { LayoutAthlete } from "../components/layout/athlete/layoutAthlete";
import { RecruiterProfile } from "../pages/recruiter/recruiterProfile";
import { AthleteProfile } from "../pages/athlete/athleteProfile";
import { ListAthletes } from "../pages/athlete/listAthlete";
import { AthleteDetail } from "../pages/athlete/athleteDetail";
import { Tournaments } from "../pages/tournaments/tournaments";
function AppRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence>
      <Routes location={location} key={location.pathname}>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/forgotPassword" element={<ForgotPassword />} />

        <Route path="/register" element={<Register />} />
        <Route path="/registerRecruit" element={<RecruiterRegister />} />

        <Route element={<ProtectedRoute requiredRole={"user"} />}>
          <Route path="user">
            <Route path="changePassword" element={<ChangePass />} />
          </Route>
        </Route>
        {/*Admin routes */}
        <Route element={<LayoutUser role="admin" routeName="Inicio" />}>
          <Route path="admin">
            <Route path="home" element={<AdminHome />} />
          </Route>
        </Route>

        <Route element={<LayoutUser role="admin" routeName="Reclutadores" />}>
          <Route path="admin">
            <Route path="recruiters" element={<AdminRecruiters />} />
            <Route path="recruiter/:id" element={<AdminRecruiterDetail />} />
          </Route>
        </Route>

        <Route element={<LayoutUser role="admin" routeName="Deportistas" />}>
          <Route path="admin">
            <Route path="athletes" element={<ListAthletes />} />
          </Route>
        </Route>

        {/* rutas deportista */}
        <Route element={<LayoutAthlete role="athlete" routeName="Mensajes" />}>
          <Route path="athlete">
            <Route path="messages" element={<AthleteMessages />} />
          </Route>

          <Route path="athlete">
            <Route path="profile" element={<AthleteProfile />} />
          </Route>
        </Route>

        {/* rutas reclutador */}
        <Route
          element={<LayoutRecruiter role="recruiter" routeName="Mensajes" />}
        >
          <Route path="recruiter">
            <Route path="messages" element={<RecruiterMessages />} />
          </Route>
        </Route>
        <Route
          element={
            <LayoutRecruiter
              role="recruiter"
              routeName="¡Encuentra a tu siguiente jugador estrella!"
            />
          }
        >
          <Route path="recruiter">
            <Route path="home" element={<ListAthletes />} />
          </Route>
        </Route>

        <Route
          element={<LayoutRecruiter role="recruiter" routeName="Perfil" />}
        >
          <Route path="recruiter">
            <Route path="profile" element={<RecruiterProfile />} />
          </Route>
        </Route>
        <Route
          element={<LayoutRecruiter role="recruiter" routeName="Atleta" />}
        >
          <Route path="recruiter">
            <Route path="athlete/:id" element={<AthleteDetail />} />
          </Route>
        </Route>
        {/* Not Found */}
        <Route path="*" element={<NotFound />} />
        <Route path="/registerAthlete" element={<RegisterDeportista />} />
        <Route element={<Layout />}>
          <Route path="/tournaments" element={<Tournaments />} />
        </Route>
      </Routes>
    </AnimatePresence>
  );
}
export default AppRoutes;
