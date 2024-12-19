import Header from "../components/common/Header";
import Slider from "@mui/material/Slider";
import { useState } from "react";
import ToggleSwitch from "../components/settings/ToggleSwitch";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// SliderRow 컴포넌트 생성
const SliderRow = ({ label, value, onChange, min = 0, max = 100 }) => (
  <div
    style={{
        display: "flex",
        alignItems: "center",    // 수직 중앙 정렬
        justifyContent: "center", // 가로 중앙 정렬
        gap: "20px",             // 레이블과 토글 버튼 사이 간격
        marginBottom: "20px",    // 아래 여백
    }}
  >
    <span className="text-xl font-semibold">{label}</span>
    <Slider
      value={value}
      onChange={onChange}
      min={min}
      max={max}
      sx={{ width: 400 }}
    />
    <span className="text-xl font-semibold" style={{ marginLeft: "20px" }}>
      {value}
    </span>
  </div>
);

// ToggleRow 컴포넌트 생성
const ToggleRow = ({ label, isOn, onToggle }) => (
    <div
      style={{
        display: "flex",
        alignItems: "center",    // 수직 중앙 정렬
        justifyContent: "center", // 가로 중앙 정렬
        gap: "20px",             // 레이블과 토글 버튼 사이 간격
        marginBottom: "20px",    // 아래 여백
      }}
    >
      <span className="text-xl font-semibold">{label}</span>
      <ToggleSwitch isOn={isOn} onToggle={onToggle} />
    </div>
  );

const SettingsPage = () => {
  const [custom_value, setCustomValue] = useState(50);

  // Separate state for each mode
  const [work, setWork] = useState({
    brightness: 50,
    display: 30,
    performance: 50,
  });

  const [reset, setReset] = useState({
    brightness: 50,
    display: 30,
    performance: 50,
  });

  const [sleep, setSleep] = useState({
    brightness: 50,
    display: 30,
    performance: 50,
  });

  const [toggle, setToggle] = useState({
    disk: true,
    usb: true,
    hibernation: true,
  });

  const [workToggle, setWorkToggle] = useState({
    disk: true,
    usb: true,
    hibernation: true,
  });
  
  const [resetToggle, setResetToggle] = useState({
    disk: true,
    usb: true,
    hibernation: true,
  });
  
  const [sleepToggle, setSleepToggle] = useState({
    disk: true,
    usb: true,
    hibernation: true,
  });
  

  const handleSliderChange = (mode, field) => (event, newValue) => {
    if (mode === "work") {
      setWork((prev) => ({ ...prev, [field]: newValue }));
    } else if (mode === "reset") {
      setReset((prev) => ({ ...prev, [field]: newValue }));
    } else if (mode === "sleep") {
      setSleep((prev) => ({ ...prev, [field]: newValue }));
    }
  };

  const handleSave = () => {
    toast.success("저장되었습니다.");
  };

  return (
    <div className="flex-1 overflow-auto relative z-10">
      <Header title="Settings" />
      <div className="max-w-6xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
        {/* Customized Plugin */}
        <div className="bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl border border-gray-700 px-8 py-5 mb-10">
          <span className="text-3xl font-semibold">Customized Plugin</span>
          <SliderRow
            value={custom_value}
            onChange={(e, newValue) => setCustomValue(newValue)}
          />
        </div>

        {/* Work Mode */}
        <div className="bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl border border-gray-700 px-8 py-5 mb-10">
          <span className="text-red-600 text-3xl font-semibold">Work Mode</span>
          <SliderRow
            label="Brightness"
            value={work.brightness}
            onChange={handleSliderChange("work", "brightness")}
          />
          <SliderRow
            label="Display timeout (Minute)"
            value={work.display}
            onChange={handleSliderChange("work", "display")}
            min={0}
            max={60}
          />
          <SliderRow
            label="CPU performance"
            value={work.performance}
            onChange={handleSliderChange("work", "performance")}
          />
          <ToggleRow
            label="Disk Power Saving Mode"
            isOn={workToggle.disk}
            onToggle={() => setWorkToggle((prev) => ({ ...prev, disk: !prev.disk }))}
          />
          <ToggleRow
            label="USB port Saving Mode"
            isOn={workToggle.usb}
            onToggle={() => setWorkToggle((prev) => ({ ...prev, usb: !prev.usb }))}
          />
          <ToggleRow
            label="Hibernation Mode"
            isOn={workToggle.hibernation}
            onToggle={() =>
                setWorkToggle((prev) => ({ ...prev, hibernation: !prev.hibernation }))
            }
          />
        </div>

        {/* Reset Mode */}
        <div className="bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl border border-gray-700 px-8 py-5 mb-10">
          <span className="text-yellow-500 text-3xl font-semibold">
            Rest Mode
          </span>
          <SliderRow
            label="Brightness"
            value={reset.brightness}
            onChange={handleSliderChange("reset", "brightness")}
          />
          <SliderRow
            label="Display timeout (Minute)"
            value={reset.display}
            onChange={handleSliderChange("reset", "display")}
            min={0}
            max={60}
          />
          <SliderRow
            label="CPU performance"
            value={reset.performance}
            onChange={handleSliderChange("work", "performance")}
          />
          <ToggleRow
            label="Disk Power Saving Mode"
            isOn={resetToggle.disk}
            onToggle={() => setResetToggle((prev) => ({ ...prev, disk: !prev.disk }))}
          />
          <ToggleRow
            label="USB port Saving Mode"
            isOn={resetToggle.usb}
            onToggle={() => setResetToggle((prev) => ({ ...prev, usb: !prev.usb }))}
          />
          <ToggleRow
            label="Hibernation Mode"
            isOn={resetToggle.hibernation}
            onToggle={() =>
                setResetToggle((prev) => ({ ...prev, hibernation: !prev.hibernation }))
            }
          />
        </div>

        {/* Sleep Mode */}
        <div className="bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl border border-gray-700 px-8 py-5">
          <span className="text-green-600 text-3xl font-semibold">
            Sleep Mode
          </span>
          <SliderRow
            label="Brightness"
            value={sleep.brightness}
            onChange={handleSliderChange("sleep", "brightness")}
          />
          <SliderRow
            label="Display timeout (Minute)"
            value={sleep.display}
            onChange={handleSliderChange("sleep", "display")}
            min={0}
            max={60}
          />
          <SliderRow
            label="CPU performance"
            value={sleep.performance}
            onChange={handleSliderChange("work", "performance")}
          />
          <ToggleRow
            label="Disk Power Saving Mode"
            isOn={sleepToggle.disk}
            onToggle={() => setSleepToggle((prev) => ({ ...prev, disk: !prev.disk }))}
          />
          <ToggleRow
            label="USB port Saving Mode"
            isOn={sleepToggle.usb}
            onToggle={() => setSleepToggle((prev) => ({ ...prev, usb: !prev.usb }))}
          />
          <ToggleRow
            label="Hibernation Mode"
            isOn={sleepToggle.hibernation}
            onToggle={() =>
                setSleepToggle((prev) => ({ ...prev, hibernation: !prev.hibernation }))
            }setResetToggle
          />
        </div>

        <div
          style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}
        >
          <button
            onClick={handleSave}
            style={{
              backgroundColor: "#ffeb3b",
              color: "black",
              padding: "15px 32px",
              fontSize: "22px",
              fontWeight: "bold",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
            }}
          >
            Submit
          </button>
        </div>
        <ToastContainer position="top-center" autoClose={500} />
      </div>
    </div>
  );
};

export default SettingsPage;