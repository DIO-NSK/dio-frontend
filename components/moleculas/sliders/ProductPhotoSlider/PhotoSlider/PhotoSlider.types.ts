export interface PhotoSliderProps {
  setActive: (photo?: string) => void;
  activePhoto?: string;
  photos: string[];
}
