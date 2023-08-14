import Header from '../Header/Header.js';
import MainNav from '../MainNav/MainNav.js';
import ProfileForm from '../ProfileForm/ProfileForm.js';
import SideNav from '../SideNav/SideNav.js';

function Profile({
  onOpenSideNav,
  isSideNavOpen,
  onCloseSideNav,
  onUpdateUser,
  onSignout,
  submitError,
  onSubmitError,
  onSuccessfulUpdate
}) {
  return (
    <>
      <Header>
        <MainNav
          onClick={onOpenSideNav}
        />
      </Header>
      <ProfileForm
        onFormSubmit={onUpdateUser}
        onSignout={onSignout}
        submitError={submitError}
        onSubmitError={onSubmitError}
        onSuccessfulUpdate={onSuccessfulUpdate}
      />
      <SideNav
      isOpen={isSideNavOpen}
      onCloseSideNav={onCloseSideNav}
    />
    </>
    
  );
}

export default Profile;
