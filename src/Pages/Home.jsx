const Home = ({ user }) => {
  return (
    <div className="home">
      {user !== null ? (
        <h1>`WELCOME BACK ${user.name}`</h1>
      ) : (
        <h1>WELCOME BACK</h1>
      )}
    </div>
  );
};

export default Home;
