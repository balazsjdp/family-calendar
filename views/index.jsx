const React = require('react');

const Index = (props) => {
    return ( 
        <>
          <h2>Hello</h2>

        <p>{JSON.stringify(props.events)}</p>
        </>
     );
}
 
export default Index;