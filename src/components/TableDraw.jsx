import { Circle, Layer, Stage, Text } from 'react-konva';

// import dynamic from 'next/dynamic';

// Dynamically import react-konva components
// const Stage = dynamic(() => import('react-konva').then((mod) => mod.Stage), { ssr: false });
// const Layer = dynamic(() => import('react-konva').then((mod) => mod.Layer), { ssr: false });
// const Rect = dynamic(() => import('react-konva').then((mod) => mod.Rect), { ssr: false });

export default function TableDraw() {
  console.log('TableDraw');
  return (
    <Stage width={100} height={100}>
      <Layer></Layer>
    </Stage>
  );
}
