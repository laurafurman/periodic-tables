import React from "react";

import { Redirect, Route, Switch } from "react-router-dom";
import Dashboard from "../dashboard/Dashboard";
import NotFound from "./NotFound";
import { today } from "../utils/date-time";
import ReservationAdd from "../reservations/ReservationAdd";
import ReservationEdit from "../reservations/ReservationEdit";
import SeatReservation from "../reservations/SeatReservation";
import Search from "../search/Search";
import TableAdd from "../tables/TableAdd";

/**
 * Defines all the routes for the application.
 *
 * You will need to make changes to this file.
 *
 * @returns {JSX.Element}
 */
function Routes() {
  return (
    <Switch>
      <Route exact={true} path="/">
        <Redirect to={"/dashboard"} />
      </Route>
      <Route exact={true} path="/reservations">
        <Redirect to={"/dashboard"} />
      </Route>
      <Route path="/dashboard">
        <Dashboard date={today()} />
      </Route>
      <Route exact={true} path="/reservations/new">
        <ReservationAdd />
      </Route>
      <Route exact={true} path="/reservations/:reservation_id/edit">
        <ReservationEdit />
      </Route>
      <Route exact={true} path="/reservations/:reservation_id/seat">
        <SeatReservation />
      </Route>
      <Route exact={true} path="/search">
        <Search />
      </Route>
      <Route exact={true} path="/tables/new">
        <TableAdd />
      </Route>
      <Route>
        <NotFound />
      </Route>
    </Switch>
  );
}

export default Routes;
