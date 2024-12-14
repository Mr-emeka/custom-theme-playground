// import React from "react";

// function Preview() {
//   return (
//     <div>
//       <style jsx global>{`
//         :root {
//           --primaryColor: var(--primaryColor, #000000);
//           --backgroundColor: var(--backgroundColor, #f0f0f0);
//         }
//         body {
//           background-color: var(--backgroundColor);
//         }
//       `}</style>
//       <div>
//         <h1>Preview Page</h1>
//         <p>This is a sample preview page</p>
//       </div>
//     </div>
//   );
// }

// export default Preview;


import React from 'react';

function Preview({text = "Smart Menu AI"}) {
  const styles = {
    root: {
      backgroundColor: 'var(--backgroundColor, #f0f0f0)',
      height: '100%'
    },
    h1: {
      color: 'var(--primaryColor, #000000)',
    },
  };

  return (
    <div style={styles.root}>
      <h1 style={styles.h1} className='text-center text-4xl'>{text}</h1>
      <p className='text-2xl text-bold'>This is a sample preview page</p>
    </div>
  );
}

export default Preview;
