import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import StartPage from './pages/StartPage';
import LoginPage from './pages/LoginPage';
import PageNotFound from './pages/PageNotFound';
import HomePage from './pages/HomePage';
import NavBarHome from './components/HomeComponents/NavBarHome';
import SwitchTheme from './components/MainComponents/SwitchTheme';
import FooterHome from './components/HomeComponents/FooterHome';
import { UserIdProvider } from './context/UserIdProvider';
import { UserNameProvider } from './context/UserNameProvider';
import { ChartProviderRound } from './context/ChartManagerRound';
import { ChartProviderLine } from './context/ChartManagerLine';
import { ChartProviderScore } from './context/ChartManagerScore';

const App = () => {

    const HomeContainer = () => {

        if (localStorage.getItem('jwt') && localStorage.getItem('role') === 'administrator') {
            return (
                <>
                    <NavBarHome />
                    <Routes>
                        <Route path="/" element={<HomePage role="administrator" />} />
                        <Route path="*" element={<PageNotFound navigation={"/"} />} />
                    </Routes>
                    <FooterHome />
                </>
            )
        }

        else if (localStorage.getItem('jwt') && localStorage.getItem('role') === 'employee') {
            return (
                <>
                    <NavBarHome />
                    <Routes>
                        <Route path="/" element={<HomePage role="employee" />} />
                        <Route path="*" element={<PageNotFound navigation={"/"} />} />
                    </Routes>
                    <FooterHome />
                </>
            )
        }

        else {
            return (
                <>
                    <Routes>
                        <Route path="*" element={<PageNotFound navigation={"/"} />} />
                    </Routes>
                </>
            )
        }

    }

    const StartContainer = () => {
        return (
            <>
                <Routes>
                    <Route path="/" element={<StartPage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="*" element={<PageNotFound navigation={"/"} />} />
                </Routes>
            </>
        );
    }

    return (
        <>
            <ChartProviderScore>
                <ChartProviderLine>
                    <ChartProviderRound>
                        <UserNameProvider>
                            <UserIdProvider>
                                <BrowserRouter>
                                    <SwitchTheme />
                                    <Routes>
                                        <Route path="/*" element={<StartContainer />} />
                                        <Route path='/homepage/*' element={<HomeContainer />} />
                                        <Route path="*" element={<PageNotFound navigation={"/"} />} />

                                    </Routes>
                                </BrowserRouter>
                            </UserIdProvider >
                        </UserNameProvider>
                    </ChartProviderRound>
                </ChartProviderLine>
            </ChartProviderScore>
        </>
    );
};

export default App;