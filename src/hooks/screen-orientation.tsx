import { useState, useEffect } from 'react';

const useScreenOrientation = () => {
  const [orientation, setOrientation] = useState<OrientationType>(window.screen.orientation.type);
  const [isLandscape, setIsLandscape] = useState(
    window.screen.orientation.type.indexOf('landscape') !== -1)
  
  useEffect(() => {
    const handleOrientationChange = () => {
      const screenOrientation = window.screen.orientation.type;
      console.log('screenOrientation',screenOrientation)
      setOrientation(screenOrientation);
      setIsLandscape(screenOrientation.indexOf('landscape') !== -1);
    }
          
    window.addEventListener('orientationchange', handleOrientationChange);
    
    return () =>
      window.removeEventListener('orientationchange', handleOrientationChange);
  }, []);

  // useEffect(()=> {
  //   if (!orientation) {
  //     const screenOrientation = window.screen.orientation.type;
  //     setOrientation(screenOrientation);
  //     setIsLandscape(screenOrientation.indexOf('landscape') !== -1);
  //   }
  // }, [orientation])
  
  return [orientation, isLandscape];
}

export default useScreenOrientation;