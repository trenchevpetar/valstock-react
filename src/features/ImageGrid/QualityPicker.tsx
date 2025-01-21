import { useState } from "react";

import { Button } from "@/components/ui/button.tsx";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { currentQuality } from "@/features/ImageGrid/utils/currentQuality.ts";
import { QualityItemType } from "@/features/ImageGrid/utils/types.ts";

type QualityPickerProps = {
  onQualityChange: (item: QualityItemType) => void;
}

export const QualityPicker = ({ onQualityChange }: QualityPickerProps) => {
  const [quality, setQuality] = useState('4k');
  const [qualityItem, setQualityItem] = useState<QualityItemType>(currentQuality)

  const qualityList: Array<QualityItemType> = [
    {
      value: '4k',
      label: '4k quality',
      width: 3840,
      height: 2160
    },
    {
      value: 'fhd',
      label: 'FHD quality',
      width: 1920,
      height: 1080
    },
    {
      value: 'HD',
      label: 'HD quality',
      width: 1280,
      height: 720
    },
    {
      value: 'low',
      label: 'Low quality',
      width: 858,
      height: 480
    }
  ]

  const onValueChange = (data: string) => {
    setQuality(data);

    const qualityItem = qualityList.find((qualityItem) => qualityItem.value === data);
    if (qualityItem) {
      setQualityItem(qualityItem)
      onQualityChange(qualityItem)
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">Loaded in {qualityItem.label}</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Pick image quality</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup value={quality} onValueChange={onValueChange}>
          {qualityList.map(({ value, label }) => {
            return (
              <DropdownMenuRadioItem key={value} value={value}>{label}</DropdownMenuRadioItem>
            )
          })}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
