import React from 'react';
import './App.css';
import 'antd/dist/antd.css';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';
import ClaimReview from './pages/claim-review/claim-review.page';
import LoginPage from './pages/LoginPage/LoginPage';
import AppLayout from './components/AppLayout/AppLayout';
import ArticlesDashboard from './pages/articles-dashboard/articles-dashboard';

function App() {
  return (
    <Router basename="/">
      <Switch>
        <Route path="/">
          <AppLayout>
            <Switch>
              <Route exact path="/">
                <ArticlesDashboard />
              </Route>
              <Route exact path="/Claim-Review/:claimInternalUrl/:claimId">
                <ClaimReview />
              </Route>
              <Route exact path="/login">
                <LoginPage />
              </Route>
            </Switch>
          </AppLayout>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
