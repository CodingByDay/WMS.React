const Loader = (props) => {



    function context () {
        return false;

    }
    return (
        <img src="/loader.gif"  onContextMenu={(e) => e.preventDefault()} draggable="false" id="loader" width="150" alt="loading" className="loader" />
    );
   };
   export default Loader;