// declare namespace JSX {
//     interface IntrinsicElements {
//       'greeting-element': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
//     }
//   }
  

// declare namespace JSX {
//   interface IntrinsicElements {
//     'greeting-element': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
//   }
// }

// ✅ Declare JSX tag so <greeting-element /> is valid in JSX
declare namespace JSX {
  interface IntrinsicElements {
    "greeting-element": React.DetailedHTMLProps<
      React.HTMLAttributes<HTMLElement>,
      HTMLElement
    >;
  }
}
