"use client";

import Image from "next/image";
import {
  type FormEvent,
  type ReactNode,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import Navigation from "@/components/common/navigation";
import { hero_banner } from "@/constants/images";
import { useSiteContent } from "@/i18n/use-site-content";
import type {
  PriceData,
  PriceOption,
  PriceService,
  ServicesPageUi,
} from "@/i18n/content";

type CleaningDuration = PriceData["cleaningDurations"][number];
type PaymentMethod = PriceData["paymentMethods"][number];
type FrequencyOption = PriceData["frequencyOptions"][number];

type WizardFormData = {
  city: string;
  district: string;
  serviceId: string;
  optionId: string;
  cleaningDurationId: string;
  paymentMethodId: string;
  frequencyId: string;
  rooms: string;
  bathrooms: string;
  squareMeters: string;
  date: string;
  timeRange: string;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  address: string;
  note: string;
  addOns: string[];
  approval: boolean;
};

type UpdateField = <Key extends keyof WizardFormData>(
  key: Key,
  value: WizardFormData[Key]
) => void;

type FieldErrors = Partial<Record<keyof WizardFormData, string>>;

type PriceSummary = {
  totalLabel: string;
  lines: { label: string; value: string }[];
};

type EstimateContentProps = {
  formData: WizardFormData;
  selectedService: PriceService;
  selectedOption: PriceOption;
  selectedDuration: CleaningDuration;
  selectedPayment: PaymentMethod;
  selectedFrequency: FrequencyOption;
  priceSummary: PriceSummary;
};

const createInitialFormData = (priceData: PriceData): WizardFormData => ({
  city: "Istanbul",
  district: "",
  serviceId: priceData.services[0].id,
  optionId: priceData.services[0].options[0].id,
  cleaningDurationId: priceData.cleaningDurations[0].id,
  paymentMethodId: priceData.paymentMethods[0].id,
  frequencyId: priceData.frequencyOptions[0].id,
  rooms: "2",
  bathrooms: "1",
  squareMeters: "",
  date: "",
  timeRange: "",
  firstName: "",
  lastName: "",
  phone: "",
  email: "",
  address: "",
  note: "",
  addOns: [],
  approval: false,
});

const panelClass =
  "rounded-lg border border-[#151a17]/10 bg-[#f7f8f4]/96 text-[#151a17] shadow-[0_18px_70px_rgba(0,0,0,0.18)] backdrop-blur-md";

const inputClass =
  "mt-1.5 h-11 w-full rounded-md border border-[#151a17]/14 bg-white/80 px-3 text-sm font-semibold text-[#151a17] outline-none transition placeholder:text-[#151a17]/36 focus:border-accent focus:ring-4 focus:ring-accent/12";

const textareaClass =
  "mt-1.5 w-full rounded-md border border-[#151a17]/14 bg-white/80 px-3 py-3 text-sm font-semibold text-[#151a17] outline-none transition placeholder:text-[#151a17]/36 focus:border-accent focus:ring-4 focus:ring-accent/12";

const controlErrorClass =
  "border-accent bg-accent/5 focus:border-accent focus:ring-accent/24";

const fieldIds: Partial<Record<keyof WizardFormData, string>> = {
  city: "city",
  district: "district",
  serviceId: "service-type",
  optionId: "package-options",
  cleaningDurationId: "duration-options",
  paymentMethodId: "payment-options",
  frequencyId: "frequency-options",
  rooms: "rooms",
  bathrooms: "bathrooms",
  squareMeters: "square-meters",
  date: "service-date",
  timeRange: "time-range",
  firstName: "first-name",
  lastName: "last-name",
  phone: "phone",
  email: "email",
  address: "address",
  approval: "approval",
};

const fieldFocusOrder: (keyof WizardFormData)[] = [
  "city",
  "district",
  "serviceId",
  "optionId",
  "cleaningDurationId",
  "frequencyId",
  "paymentMethodId",
  "rooms",
  "bathrooms",
  "squareMeters",
  "date",
  "timeRange",
  "firstName",
  "lastName",
  "phone",
  "email",
  "address",
  "approval",
];

export default function ServicesPageInject() {
  const servicesPage = useSiteContent().servicesPage;
  const { priceData, ui } = servicesPage;
  const {
    services,
    additionalServices,
    cleaningDurations,
    frequencyOptions,
    paymentMethods,
  } = priceData;
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState<WizardFormData>(() =>
    createInitialFormData(priceData)
  );
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [focusRequestId, setFocusRequestId] = useState(0);
  const lastFocusedRequestId = useRef(0);
  const [isSent, setIsSent] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [isMobileEstimateOpen, setIsMobileEstimateOpen] = useState(false);
  const [isLocationEstimateVisible, setIsLocationEstimateVisible] =
    useState(false);
  const locationEstimateRef = useRef<HTMLDivElement>(null);

  const selectedService = useMemo(
    () =>
      services.find((service) => service.id === formData.serviceId) ??
      services[0],
    [formData.serviceId, services]
  );

  const selectedOption = useMemo(
    () =>
      selectedService.options.find((option) => option.id === formData.optionId) ??
      selectedService.options[0],
    [formData.optionId, selectedService]
  );

  const selectedDuration =
    cleaningDurations.find(
      (duration) => duration.id === formData.cleaningDurationId
    ) ?? cleaningDurations[0];

  const selectedPayment =
    paymentMethods.find((method) => method.id === formData.paymentMethodId) ??
    paymentMethods[0];

  const selectedFrequency =
    frequencyOptions.find((frequency) => frequency.id === formData.frequencyId) ??
    frequencyOptions[0];

  const selectedAddOns = useMemo(
    () =>
      additionalServices.filter((service) =>
        formData.addOns.includes(service.id)
      ),
    [additionalServices, formData.addOns]
  );

  const priceSummary = useMemo(
    () =>
      calculatePrice({
        formData,
        selectedOption,
        selectedDuration,
        selectedFrequency,
        selectedAddOnsCount: selectedAddOns.length,
        priceCopy: ui.price,
      }),
    [
      formData,
      selectedAddOns.length,
      selectedDuration,
      selectedFrequency,
      selectedOption,
      ui.price,
    ]
  );

  const fieldErrorList = getFieldErrorList(fieldErrors, ui.fieldLabels);
  const hasFieldErrors = fieldErrorList.length > 0;

  useEffect(() => {
    if (
      focusRequestId === 0 ||
      focusRequestId === lastFocusedRequestId.current
    ) {
      return;
    }

    const fieldKey = fieldFocusOrder.find((key) => fieldErrors[key]);
    const fieldId = fieldKey ? fieldIds[fieldKey] : undefined;
    const fieldElement = fieldId ? document.getElementById(fieldId) : null;

    fieldElement?.focus({ preventScroll: false });
    lastFocusedRequestId.current = focusRequestId;
  }, [activeStep, fieldErrors, focusRequestId]);

  useEffect(() => {
    if (activeStep !== 0) {
      return;
    }

    const estimateElement = locationEstimateRef.current;

    if (!estimateElement || typeof IntersectionObserver === "undefined") {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        setIsLocationEstimateVisible(Boolean(entry?.isIntersecting));
      },
      {
        rootMargin: "0px 0px -12% 0px",
        threshold: 0.2,
      }
    );

    observer.observe(estimateElement);

    return () => observer.disconnect();
  }, [activeStep]);

  const showMobilePriceDock =
    activeStep !== 0 || !isLocationEstimateVisible;

  const resetValidationFeedback = () => {
    setFieldErrors({});
  };

  const requestErrorFocus = () => {
    setFocusRequestId((current) => current + 1);
  };

  const updateField: UpdateField = (key, value) => {
    const nextData: WizardFormData = { ...formData, [key]: value };

    setFormData(nextData);
    setFieldErrors((current) => {
      if (!current[key]) return current;

      const next = { ...current };
      const nextMessage = getStepErrors(
        activeStep,
        nextData,
        selectedOption,
        ui.validation
      )[key];

      if (nextMessage) {
        next[key] = nextMessage;
      } else {
        delete next[key];
      }

      return next;
    });
    setIsSent(false);
    setSubmitError("");
  };

  const selectService = (serviceId: string) => {
    const nextService =
      services.find((service) => service.id === serviceId) ?? services[0];

    setFormData((current) => ({
      ...current,
      serviceId: nextService.id,
      optionId: nextService.options[0].id,
    }));
    resetValidationFeedback();
    setIsSent(false);
    setSubmitError("");
  };

  const toggleAddOn = (addOnId: string) => {
    setFormData((current) => ({
      ...current,
      addOns: current.addOns.includes(addOnId)
        ? current.addOns.filter((item) => item !== addOnId)
        : [...current.addOns, addOnId],
    }));
    setIsSent(false);
    setSubmitError("");
  };

  const goToStep = (step: number) => {
    setActiveStep(step);
    setIsMobileEstimateOpen(false);
    setIsLocationEstimateVisible(false);
    resetValidationFeedback();
  };

  const goBack = () => {
    goToStep(Math.max(activeStep - 1, 0));
  };

  const goNext = () => {
    const errors = getStepErrors(
      activeStep,
      formData,
      selectedOption,
      ui.validation
    );

    if (hasValidationErrors(errors)) {
      setFieldErrors(errors);
      requestErrorFocus();
      return;
    }

    goToStep(Math.min(activeStep + 1, ui.wizardSteps.length - 1));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (isSubmitting) return;

    const invalidStep = ui.wizardSteps.findIndex((_, index) =>
      hasValidationErrors(
        getStepErrors(index, formData, selectedOption, ui.validation)
      )
    );

    if (invalidStep >= 0) {
      setFieldErrors(
        getStepErrors(invalidStep, formData, selectedOption, ui.validation)
      );
      setActiveStep(invalidStep);
      setIsMobileEstimateOpen(false);
      setIsLocationEstimateVisible(false);
      requestErrorFocus();
      setSubmitError("");
      return;
    }

    setIsSubmitting(true);
    setSubmitError("");
    setIsSent(false);

    try {
      const response = await fetch("/api/service-request", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          service: selectedService.title,
          package: selectedOption.label,
          packageDetail: selectedOption.detail,
          estimate: priceSummary.totalLabel,
          location: `${formData.city} / ${formData.district}`,
          schedule: `${formData.date} ${formData.timeRange}`,
          home: {
            rooms: formData.rooms,
            bathrooms: formData.bathrooms,
            squareMeters: formData.squareMeters,
          },
          contact: {
            firstName: formData.firstName.trim(),
            lastName: formData.lastName.trim(),
            phone: formData.phone.trim(),
            email: formData.email.trim(),
            address: formData.address.trim(),
          },
          duration: `${selectedDuration.label} (${selectedDuration.hours})`,
          payment: `${selectedPayment.label} - ${selectedPayment.description}`,
          frequency: selectedFrequency.label,
          addOns: selectedAddOns.map((item) => item.label),
          note: formData.note.trim(),
          priceLines: priceSummary.lines,
        }),
      });
      const result = (await response.json().catch(() => ({}))) as {
        error?: string;
      };

      if (!response.ok) {
        throw new Error(result.error ?? ui.feedback.submitFallback);
      }

      setIsSent(true);
    } catch (error) {
      setSubmitError(
        error instanceof Error
          ? error.message
          : ui.feedback.submitFallback
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#151a17] text-[#f7f8f4]">
      <BackgroundImage />
      <div className="relative z-10">
        <Navigation tone="dark" compact />

        <section className="mx-auto w-[90%] max-w-[1440px] pb-28 lg:pb-10">
          <CompactHeader
            selectedService={selectedService}
            selectedOption={selectedOption}
            priceSummary={priceSummary}
          />

          <div className="mt-4 grid gap-4 lg:grid-cols-[290px_minmax(0,1fr)_300px] xl:grid-cols-[310px_minmax(0,1fr)_320px]">
            <div className={activeStep === 0 ? "" : "hidden lg:block"}>
              <ServiceMenu
                selectedService={selectedService}
                onSelectService={selectService}
              />
            </div>

            <form className={panelClass} onSubmit={handleSubmit} noValidate>
              <div className="border-b border-[#151a17]/10 p-4 sm:p-5">
                <StepTabs
                  activeStep={activeStep}
                  setActiveStep={goToStep}
                  steps={ui.wizardSteps}
                />
              </div>

              <div className="p-4 sm:p-5">
                {activeStep === 0 ? (
                  <LocationStep
                    formData={formData}
                    fieldErrors={fieldErrors}
                    updateField={updateField}
                  />
                ) : null}

                {activeStep === 1 ? (
                  <ServiceStep
                    formData={formData}
                    fieldErrors={fieldErrors}
                    selectedService={selectedService}
                    selectService={selectService}
                    updateField={updateField}
                  />
                ) : null}

                {activeStep === 2 ? (
                  <HomeStep
                    formData={formData}
                    fieldErrors={fieldErrors}
                    selectedOption={selectedOption}
                    updateField={updateField}
                    toggleAddOn={toggleAddOn}
                  />
                ) : null}

                {activeStep === 3 ? (
                  <ContactStep
                    formData={formData}
                    fieldErrors={fieldErrors}
                    selectedService={selectedService}
                    selectedOption={selectedOption}
                    selectedDuration={selectedDuration}
                    selectedPayment={selectedPayment}
                    selectedFrequency={selectedFrequency}
                    selectedAddOns={selectedAddOns}
                    priceSummary={priceSummary}
                    updateField={updateField}
                  />
                ) : null}

                {hasFieldErrors ? (
                  <div
                    role="alert"
                    className="mt-4 rounded-md border border-accent/30 bg-accent/10 px-3 py-2 text-sm font-bold text-accent"
                  >
                    <p>{ui.feedback.fixFields}</p>
                    <ul className="mt-1 grid gap-1">
                      {fieldErrorList.map(({ key, label, message }) => (
                        <li key={key}>
                          {label}: {message}
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : null}

                <div className="mt-5 grid grid-cols-2 gap-2 sm:gap-3">
                  <button
                    type="button"
                    onClick={goBack}
                    disabled={activeStep === 0}
                    className="h-11 min-w-0 rounded-md border border-[#151a17]/14 bg-white/70 px-2 text-sm font-black text-[#151a17] transition hover:border-[#151a17] disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    {ui.buttons.back}
                  </button>

                  {activeStep === ui.wizardSteps.length - 1 ? (
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="h-11 min-w-0 rounded-md bg-accent px-2 text-sm font-black text-white transition hover:bg-[#d94d26] disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      {isSubmitting
                        ? ui.buttons.sending
                        : ui.buttons.sendRequest}
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={goNext}
                    className="h-11 min-w-0 rounded-md bg-accent px-2 text-sm font-black text-white transition hover:bg-[#d94d26]"
                  >
                      {ui.buttons.continue}
                    </button>
                  )}
                </div>

                {isSent ? (
                  <p
                    role="status"
                    className="mt-4 rounded-md border border-[#d0a850]/45 bg-[#d0a850]/18 px-3 py-2 text-sm font-bold text-[#70550f]"
                  >
                    {ui.feedback.success}
                  </p>
                ) : null}

                {submitError ? (
                  <p
                    role="alert"
                    className="mt-4 rounded-md border border-accent/30 bg-accent/10 px-3 py-2 text-sm font-bold text-accent"
                  >
                    {submitError}
                  </p>
                ) : null}
              </div>
            </form>

            {activeStep === 0 ? (
              <div ref={locationEstimateRef} className="lg:hidden">
                <MobileEstimatePanel
                  formData={formData}
                  selectedService={selectedService}
                  selectedOption={selectedOption}
                  selectedDuration={selectedDuration}
                  selectedPayment={selectedPayment}
                  selectedFrequency={selectedFrequency}
                  priceSummary={priceSummary}
                  isOpen={isMobileEstimateOpen}
                  onToggle={() =>
                    setIsMobileEstimateOpen((current) => !current)
                  }
                />
              </div>
            ) : null}

            <div className="hidden lg:block">
              <EstimatePanel
                formData={formData}
                selectedService={selectedService}
                selectedOption={selectedOption}
                selectedDuration={selectedDuration}
                selectedPayment={selectedPayment}
                selectedFrequency={selectedFrequency}
                priceSummary={priceSummary}
              />
            </div>
          </div>
        </section>
      </div>

      <MobilePriceDock
        priceSummary={priceSummary}
        selectedService={selectedService}
        isVisible={showMobilePriceDock}
      />
    </main>
  );
}

function BackgroundImage() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0">
      <Image
        src={hero_banner}
        alt=""
        fill
        priority
        sizes="100vw"
        className="scale-105 object-cover opacity-35 blur-[8px]"
      />
      <div className="absolute inset-0 bg-[#151a17]/78" />
      <div className="absolute inset-0 bg-gradient-to-b from-[#151a17]/15 via-transparent to-[#151a17]/45" />
    </div>
  );
}

function CompactHeader({
  selectedService,
  selectedOption,
  priceSummary,
}: {
  selectedService: PriceService;
  selectedOption: PriceOption;
  priceSummary: PriceSummary;
}) {
  const ui = useSiteContent().servicesPage.ui;

  return (
    <header className="hidden lg:block rounded-lg border border-[#f7f8f4]/14 bg-[#f7f8f4]/9 p-3 backdrop-blur-md sm:p-4">
      <div className="grid gap-3 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
        <div>
          <p className="font-gambetta text-base text-[#f7f8f4]/62">
            {ui.compactHeader.eyebrow}
          </p>
          <h1 className="mt-1 font-anton-sc text-3xl uppercase leading-none text-[#f7f8f4] sm:text-4xl lg:text-5xl">
            {ui.compactHeader.title}
          </h1>
          <p className="mt-2 max-w-2xl text-sm font-semibold leading-6 text-[#f7f8f4]/66">
            {ui.compactHeader.description}
          </p>
        </div>

        <div className="grid gap-2 sm:grid-cols-3 lg:w-[30rem]">
          <Metric label={ui.summary.service} value={selectedService.title} />
          <Metric label={ui.summary.package} value={selectedOption.label} />
          <Metric label={ui.summary.estimate} value={priceSummary.totalLabel} accent />
        </div>
      </div>
    </header>
  );
}

function ServiceMenu({
  selectedService,
  onSelectService,
}: {
  selectedService: PriceService;
  onSelectService: (serviceId: string) => void;
}) {
  const { priceData, ui } = useSiteContent().servicesPage;

  return (
    <aside className={`${panelClass} overflow-hidden`}>
      <div className="border-b border-[#151a17]/10 p-3">
        <p className="text-xs font-black uppercase tracking-[0.12em] text-accent">
          {ui.serviceMenu.eyebrow}
        </p>
        <h2 className="mt-1 text-lg font-black">{ui.serviceMenu.title}</h2>
      </div>
      <div className="grid gap-2 p-3">
        {priceData.services.map((service) => {
          const isSelected = service.id === selectedService.id;

          return (
            <button
              key={service.id}
              type="button"
              aria-pressed={isSelected}
              onClick={() => onSelectService(service.id)}
              className={`rounded-md border p-3 text-left transition ${
                isSelected
                  ? "border-[#151a17] bg-[#151a17] text-[#f7f8f4]"
                  : "border-[#151a17]/10 bg-white/70 text-[#151a17] hover:border-accent"
              }`}
            >
              <span className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3">
                <span className="min-w-0">
                  <span
                    className={`block text-[11px] font-black uppercase leading-none tracking-[0.08em] ${
                      isSelected ? "text-[#d0a850]" : "text-accent"
                    }`}
                  >
                    {service.category}
                  </span>
                  <span className="mt-1 block text-sm font-black leading-snug">
                    {service.title}
                  </span>
                </span>
                <span
                  className={`min-w-[5.75rem] shrink-0 rounded-md px-2.5 py-1.5 text-center text-xs font-black leading-none ${
                    isSelected
                      ? "bg-[#f7f8f4]/12 text-[#f7f8f4]"
                      : "bg-[#151a17]/6 text-[#151a17]"
                  }`}
                >
                  {service.basePrice}
                </span>
              </span>
            </button>
          );
        })}
      </div>
    </aside>
  );
}

function StepTabs({
  activeStep,
  setActiveStep,
  steps,
}: {
  activeStep: number;
  setActiveStep: (step: number) => void;
  steps: string[];
}) {
  return (
    <div className="grid grid-cols-4 gap-1 sm:gap-2">
      {steps.map((step, index) => (
        <button
          key={step}
          type="button"
          onClick={() => {
            if (index <= activeStep) setActiveStep(index);
          }}
          className={`h-9 min-w-0 rounded-md border px-1 text-center text-[10px] font-black leading-tight transition sm:h-10 sm:px-3 sm:text-left sm:text-xs ${
            index === activeStep
              ? "border-accent bg-accent text-white"
              : index < activeStep
                ? "border-[#d0a850] bg-[#d0a850]/30 text-[#151a17]"
                : "border-[#151a17]/10 bg-white/70 text-[#151a17]/48"
          }`}
        >
          <span className="block truncate">
            {index + 1}. {step}
          </span>
        </button>
      ))}
    </div>
  );
}

function LocationStep({
  formData,
  fieldErrors,
  updateField,
}: {
  formData: WizardFormData;
  fieldErrors: FieldErrors;
  updateField: UpdateField;
}) {
  const cityError = fieldErrors.city;
  const districtError = fieldErrors.district;
  const { priceData, ui } = useSiteContent().servicesPage;

  return (
    <StepShell
      title={ui.steps.location.title}
      text={ui.steps.location.text}
    >
      <div className="grid gap-3 sm:grid-cols-2">
        <Field label={ui.steps.location.city} htmlFor="city" error={cityError}>
          <select
            id="city"
            required
            value={formData.city}
            onChange={(event) => updateField("city", event.target.value)}
            aria-invalid={Boolean(cityError)}
            aria-describedby={getErrorId("city", cityError)}
            className={getControlClass(inputClass, cityError)}
          >
            <option value="Istanbul">{ui.steps.location.cityOption}</option>
          </select>
        </Field>

        <Field
          label={ui.steps.location.district}
          htmlFor="district"
          error={districtError}
        >
          <select
            id="district"
            required
            value={formData.district}
            onChange={(event) => updateField("district", event.target.value)}
            aria-invalid={Boolean(districtError)}
            aria-describedby={getErrorId("district", districtError)}
            className={getControlClass(inputClass, districtError)}
          >
            <option value="" disabled>
              {ui.steps.location.selectDistrict}
            </option>
            {priceData.istanbulDistricts.map((district) => (
              <option key={district} value={district}>
                {district}
              </option>
            ))}
          </select>
        </Field>
      </div>
    </StepShell>
  );
}

function ServiceStep({
  formData,
  fieldErrors,
  selectedService,
  selectService,
  updateField,
}: {
  formData: WizardFormData;
  fieldErrors: FieldErrors;
  selectedService: PriceService;
  selectService: (serviceId: string) => void;
  updateField: UpdateField;
}) {
  const serviceError = fieldErrors.serviceId;
  const packageError = fieldErrors.optionId;
  const { priceData, ui } = useSiteContent().servicesPage;

  return (
    <StepShell
      title={ui.steps.service.title}
      text={ui.steps.service.text}
    >
      <Field
        label={ui.steps.service.serviceType}
        htmlFor="service-type"
        error={serviceError}
      >
        <select
          id="service-type"
          required
          value={formData.serviceId}
          onChange={(event) => selectService(event.target.value)}
          aria-invalid={Boolean(serviceError)}
          aria-describedby={getErrorId("service-type", serviceError)}
          className={getControlClass(inputClass, serviceError)}
        >
          {priceData.services.map((service) => (
            <option key={service.id} value={service.id}>
              {service.title}
            </option>
          ))}
        </select>
      </Field>

      <div>
        <p className="text-sm font-bold text-[#151a17]">
          {ui.steps.service.package}
        </p>
        <div
          id="package-options"
          tabIndex={-1}
          aria-invalid={Boolean(packageError)}
          aria-describedby={getErrorId("package-options", packageError)}
          className={`mt-2 grid grid-cols-2 gap-2 rounded-md outline-none xl:grid-cols-3 ${
            packageError ? "border border-accent/30 bg-accent/5 p-2" : ""
          }`}
        >
          {selectedService.options.map((option) => {
            const isSelected = option.id === formData.optionId;

            return (
              <button
                key={`${selectedService.id}-${option.id}`}
                type="button"
                aria-pressed={isSelected}
                onClick={() => updateField("optionId", option.id)}
                className={`grid min-h-28 grid-rows-[auto_1fr_auto] gap-2 rounded-md border p-3 text-left transition ${
                  isSelected
                    ? "border-accent bg-accent text-white"
                    : "border-[#151a17]/10 bg-white/70 text-[#151a17] hover:border-accent"
                }`}
              >
                <span className="block text-sm font-black leading-tight">
                  {option.label}
                </span>
                <span
                  className={`block text-xs font-semibold leading-5 ${
                    isSelected ? "text-white/72" : "text-[#151a17]/52"
                  }`}
                >
                  {option.detail}
                </span>
                <span className="block text-sm font-black leading-tight">
                  {option.price}
                </span>
              </button>
            );
          })}
        </div>
        <FieldError id="package-options-error" message={packageError} />
      </div>

      <SegmentGroup
        id="duration-options"
        title={ui.steps.service.duration}
        error={fieldErrors.cleaningDurationId}
        items={priceData.cleaningDurations.map((duration) => ({
          id: duration.id,
          title: duration.label,
          text: duration.hours,
        }))}
        mobileColumns={3}
        selectedId={formData.cleaningDurationId}
        onSelect={(id) => updateField("cleaningDurationId", id)}
      />

      <div className="grid gap-3 sm:grid-cols-2">
        <SegmentGroup
          id="frequency-options"
          title={ui.steps.service.frequency}
          error={fieldErrors.frequencyId}
          mobileColumns={3}
          items={priceData.frequencyOptions.map((frequency) => ({
            id: frequency.id,
            title: frequency.label,
            text:
              frequency.discount > 0
                ? `${Math.round(frequency.discount * 100)}% ${ui.steps.service.off}`
                : ui.steps.service.base,
          }))}
          selectedId={formData.frequencyId}
          onSelect={(id) => updateField("frequencyId", id)}
        />

        <SegmentGroup
          id="payment-options"
          title={ui.steps.service.payment}
          error={fieldErrors.paymentMethodId}
          mobileColumns={2}
          items={priceData.paymentMethods.map((method) => ({
            id: method.id,
            title: method.label,
            text: method.description,
          }))}
          selectedId={formData.paymentMethodId}
          onSelect={(id) => updateField("paymentMethodId", id)}
        />
      </div>
    </StepShell>
  );
}

function HomeStep({
  formData,
  fieldErrors,
  selectedOption,
  updateField,
  toggleAddOn,
}: {
  formData: WizardFormData;
  fieldErrors: FieldErrors;
  selectedOption: PriceOption;
  updateField: UpdateField;
  toggleAddOn: (addOnId: string) => void;
}) {
  const needsSquareMeters = selectedOption.price.includes("/ m2");
  const roomsError = fieldErrors.rooms;
  const bathroomsError = fieldErrors.bathrooms;
  const squareMetersError = fieldErrors.squareMeters;
  const dateError = fieldErrors.date;
  const timeRangeError = fieldErrors.timeRange;
  const { priceData, ui } = useSiteContent().servicesPage;

  return (
    <StepShell title={ui.steps.home.title} text={ui.steps.home.text}>
      <div className="grid gap-3 sm:grid-cols-3">
        <Field label={ui.steps.home.rooms} htmlFor="rooms" error={roomsError}>
          <input
            id="rooms"
            type="number"
            min="1"
            max="12"
            required
            value={formData.rooms}
            onChange={(event) => updateField("rooms", event.target.value)}
            aria-invalid={Boolean(roomsError)}
            aria-describedby={getErrorId("rooms", roomsError)}
            className={getControlClass(inputClass, roomsError)}
          />
        </Field>
        <Field
          label={ui.steps.home.bathrooms}
          htmlFor="bathrooms"
          error={bathroomsError}
        >
          <input
            id="bathrooms"
            type="number"
            min="1"
            max="8"
            required
            value={formData.bathrooms}
            onChange={(event) => updateField("bathrooms", event.target.value)}
            aria-invalid={Boolean(bathroomsError)}
            aria-describedby={getErrorId("bathrooms", bathroomsError)}
            className={getControlClass(inputClass, bathroomsError)}
          />
        </Field>
        <Field
          label={ui.steps.home.squareMeters}
          htmlFor="square-meters"
          error={squareMetersError}
        >
          <input
            id="square-meters"
            type="number"
            min="1"
            max="1000"
            required={needsSquareMeters}
            value={formData.squareMeters}
            onChange={(event) =>
              updateField("squareMeters", event.target.value)
            }
            placeholder={
              needsSquareMeters ? ui.steps.home.required : ui.steps.home.optional
            }
            aria-invalid={Boolean(squareMetersError)}
            aria-describedby={getErrorId("square-meters", squareMetersError)}
            className={getControlClass(inputClass, squareMetersError)}
          />
        </Field>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <Field label={ui.steps.home.date} htmlFor="service-date" error={dateError}>
          <input
            id="service-date"
            type="date"
            required
            value={formData.date}
            onChange={(event) => updateField("date", event.target.value)}
            aria-invalid={Boolean(dateError)}
            aria-describedby={getErrorId("service-date", dateError)}
            className={getControlClass(inputClass, dateError)}
          />
        </Field>

        <Field
          label={ui.steps.home.startTime}
          htmlFor="time-range"
          error={timeRangeError}
        >
          <select
            id="time-range"
            required
            value={formData.timeRange}
            onChange={(event) => updateField("timeRange", event.target.value)}
            aria-invalid={Boolean(timeRangeError)}
            aria-describedby={getErrorId("time-range", timeRangeError)}
            className={getControlClass(inputClass, timeRangeError)}
          >
            <option value="" disabled>
              {ui.steps.home.selectTime}
            </option>
            {priceData.timeRangeOptions.map((timeRange) => (
              <option key={timeRange} value={timeRange}>
                {timeRange}
              </option>
            ))}
          </select>
        </Field>
      </div>

      <div>
        <p className="text-sm font-bold text-[#151a17]">
          {ui.steps.home.extras}
        </p>
        <div className="mt-2 grid gap-2 sm:grid-cols-2 xl:grid-cols-3">
          {priceData.additionalServices.map((service) => {
            const isSelected = formData.addOns.includes(service.id);

            return (
              <label
                key={service.id}
                className={`flex min-h-11 cursor-pointer items-center gap-2 rounded-md border px-3 py-2 text-xs font-bold leading-5 transition ${
                  isSelected
                    ? "border-accent bg-accent text-white"
                    : "border-[#151a17]/10 bg-white/70 text-[#151a17]/64 hover:border-accent"
                }`}
              >
                <input
                  type="checkbox"
                  checked={isSelected}
                  onChange={() => toggleAddOn(service.id)}
                  className="h-4 w-4 rounded border-[#151a17]/30 accent-accent"
                />
                <span>{service.label}</span>
              </label>
            );
          })}
        </div>
      </div>

      <Field label={ui.steps.home.note} htmlFor="note">
        <textarea
          id="note"
          rows={3}
          value={formData.note}
          onChange={(event) => updateField("note", event.target.value)}
          placeholder={ui.steps.home.notePlaceholder}
          className={textareaClass}
        />
      </Field>
    </StepShell>
  );
}

function ContactStep({
  formData,
  fieldErrors,
  selectedService,
  selectedOption,
  selectedDuration,
  selectedPayment,
  selectedFrequency,
  selectedAddOns,
  priceSummary,
  updateField,
}: {
  formData: WizardFormData;
  fieldErrors: FieldErrors;
  selectedService: PriceService;
  selectedOption: PriceOption;
  selectedDuration: CleaningDuration;
  selectedPayment: PaymentMethod;
  selectedFrequency: FrequencyOption;
  selectedAddOns: { id: string; label: string }[];
  priceSummary: PriceSummary;
  updateField: UpdateField;
}) {
  const firstNameError = fieldErrors.firstName;
  const lastNameError = fieldErrors.lastName;
  const phoneError = fieldErrors.phone;
  const emailError = fieldErrors.email;
  const addressError = fieldErrors.address;
  const approvalError = fieldErrors.approval;
  const ui = useSiteContent().servicesPage.ui;

  return (
    <StepShell title={ui.steps.contact.title} text={ui.steps.contact.text}>
      <div className="grid gap-3 sm:grid-cols-2">
        <Field
          label={ui.steps.contact.firstName}
          htmlFor="first-name"
          error={firstNameError}
        >
          <input
            id="first-name"
            type="text"
            autoComplete="given-name"
            required
            value={formData.firstName}
            onChange={(event) => updateField("firstName", event.target.value)}
            placeholder={ui.steps.contact.namePlaceholder}
            aria-invalid={Boolean(firstNameError)}
            aria-describedby={getErrorId("first-name", firstNameError)}
            className={getControlClass(inputClass, firstNameError)}
          />
        </Field>

        <Field
          label={ui.steps.contact.lastName}
          htmlFor="last-name"
          error={lastNameError}
        >
          <input
            id="last-name"
            type="text"
            autoComplete="family-name"
            required
            value={formData.lastName}
            onChange={(event) => updateField("lastName", event.target.value)}
            placeholder={ui.steps.contact.surnamePlaceholder}
            aria-invalid={Boolean(lastNameError)}
            aria-describedby={getErrorId("last-name", lastNameError)}
            className={getControlClass(inputClass, lastNameError)}
          />
        </Field>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <Field label={ui.steps.contact.phone} htmlFor="phone" error={phoneError}>
          <input
            id="phone"
            type="tel"
            autoComplete="tel"
            required
            value={formData.phone}
            onChange={(event) => updateField("phone", event.target.value)}
            placeholder="+90 5xx xxx xx xx"
            aria-invalid={Boolean(phoneError)}
            aria-describedby={getErrorId("phone", phoneError)}
            className={getControlClass(inputClass, phoneError)}
          />
        </Field>

        <Field label={ui.steps.contact.email} htmlFor="email" error={emailError}>
          <input
            id="email"
            type="email"
            autoComplete="email"
            value={formData.email}
            onChange={(event) => updateField("email", event.target.value)}
            placeholder="name@mail.com"
            aria-invalid={Boolean(emailError)}
            aria-describedby={getErrorId("email", emailError)}
            className={getControlClass(inputClass, emailError)}
          />
        </Field>
      </div>

      <Field label={ui.steps.contact.address} htmlFor="address" error={addressError}>
        <textarea
          id="address"
          rows={3}
          autoComplete="street-address"
          required
          value={formData.address}
          onChange={(event) => updateField("address", event.target.value)}
          placeholder={ui.steps.contact.addressPlaceholder}
          aria-invalid={Boolean(addressError)}
          aria-describedby={getErrorId("address", addressError)}
          className={getControlClass(textareaClass, addressError)}
        />
        <span className="mt-1.5 block text-xs font-semibold leading-5 text-[#151a17]/48">
          {ui.steps.contact.addressHint}
        </span>
      </Field>

      <div className="rounded-md border border-[#151a17]/10 bg-white/65 p-3">
        <dl className="grid gap-2 text-sm sm:grid-cols-2">
          <SummaryRow label={ui.summary.service} value={selectedService.title} />
          <SummaryRow label={ui.summary.package} value={selectedOption.label} />
          <SummaryRow label={ui.summary.duration} value={selectedDuration.label} />
          <SummaryRow label={ui.summary.payment} value={selectedPayment.label} />
          <SummaryRow label={ui.summary.frequency} value={selectedFrequency.label} />
          <SummaryRow label={ui.summary.estimate} value={priceSummary.totalLabel} />
          <SummaryRow
            label={ui.summary.extras}
            value={
              selectedAddOns.length > 0
                ? selectedAddOns.map((item) => item.label).join(", ")
                : ui.summary.none
            }
          />
        </dl>
      </div>

      <label
        className={`flex gap-3 rounded-md border bg-white/70 p-3 text-sm font-semibold leading-6 text-[#151a17]/64 ${
          approvalError ? "border-accent bg-accent/5" : "border-[#151a17]/10"
        }`}
      >
        <input
          id="approval"
          type="checkbox"
          required
          checked={formData.approval}
          onChange={(event) => updateField("approval", event.target.checked)}
          aria-invalid={Boolean(approvalError)}
          aria-describedby={getErrorId("approval", approvalError)}
          className="mt-1 h-4 w-4 rounded border-[#151a17]/30 accent-accent"
        />
        <span>{ui.steps.contact.approval}</span>
      </label>
      <FieldError id="approval-error" message={approvalError} />
    </StepShell>
  );
}

function EstimatePanel({
  formData,
  selectedService,
  selectedOption,
  selectedDuration,
  selectedPayment,
  selectedFrequency,
  priceSummary,
}: EstimateContentProps) {
  const ui = useSiteContent().servicesPage.ui;

  return (
    <aside className={`${panelClass} overflow-hidden`}>
      <div className="bg-[#151a17] p-4 text-[#f7f8f4]">
        <p className="text-xs font-black uppercase tracking-[0.12em] text-[#d0a850]">
          {ui.summary.estimate}
        </p>
        <p className="mt-2 font-anton-sc text-4xl uppercase leading-none text-[#d0a850]">
          {priceSummary.totalLabel}
        </p>
      </div>

      <EstimateDetails
        formData={formData}
        selectedService={selectedService}
        selectedOption={selectedOption}
        selectedDuration={selectedDuration}
        selectedPayment={selectedPayment}
        selectedFrequency={selectedFrequency}
        priceSummary={priceSummary}
      />
    </aside>
  );
}

function MobilePriceDock({
  priceSummary,
  selectedService,
  isVisible,
}: {
  priceSummary: PriceSummary;
  selectedService: PriceService;
  isVisible: boolean;
}) {
  return (
    <div
      aria-hidden={!isVisible}
      className={`fixed bottom-4 left-4 z-40 lg:hidden transition duration-300 ${
        isVisible
          ? "translate-y-0 opacity-100"
          : "pointer-events-none translate-y-3 opacity-0"
      }`}
    >
      <div className="max-w-[11.75rem] rounded-md border border-[#f7f8f4]/16 bg-[#151a17]/95 px-3.5 py-3 text-[#f7f8f4] shadow-[0_16px_50px_rgba(0,0,0,0.32)] backdrop-blur-md">
        <p className="truncate text-[10px] font-black uppercase leading-none tracking-[0.12em] text-[#d0a850]">
          {selectedService.title}
        </p>
        <p className="mt-1 font-anton-sc text-2xl uppercase leading-none text-[#d0a850]">
          {priceSummary.totalLabel}
        </p>
      </div>
    </div>
  );
}

function MobileEstimatePanel({
  formData,
  selectedService,
  selectedOption,
  selectedDuration,
  selectedPayment,
  selectedFrequency,
  priceSummary,
  isOpen,
  onToggle,
}: EstimateContentProps & {
  isOpen: boolean;
  onToggle: () => void;
}) {
  const ui = useSiteContent().servicesPage.ui;

  return (
    <aside className={`${panelClass} overflow-hidden`}>
      <button
        type="button"
        onClick={(event) => {
          event.preventDefault();
          onToggle();
        }}
        aria-expanded={isOpen}
        aria-controls="mobile-estimate-details"
        className="grid w-full cursor-pointer grid-cols-[minmax(0,1fr)_2.5rem] items-center gap-3 bg-[#151a17] p-4 text-left text-[#f7f8f4]"
      >
        <span className="min-w-0">
          <span className="block text-xs font-black uppercase tracking-[0.12em] text-[#d0a850]">
            {ui.summary.estimate}
          </span>
          <span className="mt-2 block truncate font-anton-sc text-4xl uppercase leading-none text-[#d0a850]">
            {priceSummary.totalLabel}
          </span>
        </span>
        <span
          aria-hidden="true"
          className={`grid h-10 w-10 place-items-center rounded-md border border-[#f7f8f4]/18 bg-[#f7f8f4]/8 text-xl font-black text-[#d0a850] transition duration-300 ${
            isOpen ? "rotate-90" : ""
          }`}
        >
          &gt;
        </span>
      </button>

      <div
        id="mobile-estimate-details"
        className={`overflow-hidden transition-[max-height,opacity] duration-300 ease-out ${
          isOpen ? "max-h-[34rem] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div>
          <EstimateDetails
            formData={formData}
            selectedService={selectedService}
            selectedOption={selectedOption}
            selectedDuration={selectedDuration}
            selectedPayment={selectedPayment}
            selectedFrequency={selectedFrequency}
            priceSummary={priceSummary}
          />
        </div>
      </div>
    </aside>
  );
}

function EstimateDetails({
  formData,
  selectedService,
  selectedOption,
  selectedDuration,
  selectedPayment,
  selectedFrequency,
  priceSummary,
}: EstimateContentProps) {
  const ui = useSiteContent().servicesPage.ui;

  return (
    <div className="space-y-4 p-4">
      <dl className="space-y-2">
        <SummaryRow label={ui.summary.service} value={selectedService.title} />
        <SummaryRow label={ui.summary.package} value={selectedOption.label} />
        <SummaryRow label={ui.summary.duration} value={selectedDuration.hours} />
        <SummaryRow label={ui.summary.payment} value={selectedPayment.label} />
        <SummaryRow label={ui.summary.plan} value={selectedFrequency.label} />
        <SummaryRow label={ui.summary.rooms} value={formData.rooms || "-"} />
      </dl>

      <div className="rounded-md border border-[#151a17]/10 bg-[#d0a850]/16 p-3">
        <p className="text-sm font-black">{ui.summary.included}</p>
        <ul className="mt-2 space-y-2">
          {selectedService.includes.slice(0, 3).map((item) => (
            <li
              key={item}
              className="flex gap-2 text-xs font-semibold leading-5 text-[#151a17]/64"
            >
              <span className="mt-2 block h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <p className="text-sm font-black">{ui.summary.breakdown}</p>
        <dl className="mt-2 space-y-2">
          {priceSummary.lines.slice(0, 4).map((line) => (
            <SummaryRow
              key={`${line.label}-${line.value}`}
              label={line.label}
              value={line.value}
            />
          ))}
        </dl>
      </div>
    </div>
  );
}

function SegmentGroup({
  id,
  title,
  error,
  items,
  selectedId,
  onSelect,
  mobileColumns = 1,
}: {
  id?: string;
  title: string;
  error?: string;
  items: { id: string; title: string; text: string }[];
  selectedId: string;
  onSelect: (id: string) => void;
  mobileColumns?: 1 | 2 | 3;
}) {
  const optionGridClass =
    mobileColumns === 3
      ? "grid-cols-3"
      : mobileColumns === 2
        ? "grid-cols-2 sm:grid-cols-3"
        : "sm:grid-cols-3";
  const optionButtonClass =
    mobileColumns > 1 ? "min-h-16 p-2 sm:min-h-20 sm:p-3" : "min-h-20 p-3";

  return (
    <div
      id={id}
      tabIndex={id ? -1 : undefined}
      aria-invalid={Boolean(error)}
      aria-describedby={id ? getErrorId(id, error) : undefined}
      className={`rounded-md outline-none ${
        error ? "border border-accent/30 bg-accent/5 p-2" : ""
      }`}
    >
      <p className="text-sm font-bold text-[#151a17]">{title}</p>
      <div className={`mt-2 grid gap-2 ${optionGridClass}`}>
        {items.map((item) => {
          const isSelected = item.id === selectedId;

          return (
            <button
              key={item.id}
              type="button"
              aria-pressed={isSelected}
              onClick={() => onSelect(item.id)}
              className={`grid grid-rows-[auto_1fr] gap-1 rounded-md border text-left transition ${optionButtonClass} ${
                isSelected
                  ? "border-[#151a17] bg-[#151a17] text-[#f7f8f4]"
                  : "border-[#151a17]/10 bg-white/70 text-[#151a17] hover:border-[#151a17]"
              }`}
            >
              <span className="block text-xs font-black leading-tight">
                {item.title}
              </span>
              <span
                className={`block text-[11px] font-semibold leading-4 ${
                  isSelected ? "text-[#f7f8f4]/64" : "text-[#151a17]/50"
                }`}
              >
                {item.text}
              </span>
            </button>
          );
        })}
      </div>
      <FieldError id={id ? `${id}-error` : undefined} message={error} />
    </div>
  );
}

function StepShell({
  title,
  text,
  children,
}: {
  title: string;
  text: string;
  children: ReactNode;
}) {
  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-2xl font-black leading-tight text-[#151a17]">
          {title}
        </h2>
        <p className="mt-1 text-sm font-semibold leading-6 text-[#151a17]/56">
          {text}
        </p>
      </div>
      {children}
    </div>
  );
}

function Field({
  label,
  htmlFor,
  error,
  children,
}: {
  label: string;
  htmlFor: string;
  error?: string;
  children: ReactNode;
}) {
  return (
    <label htmlFor={htmlFor} className="block text-sm font-bold text-[#151a17]">
      {label}
      {children}
      <FieldError id={`${htmlFor}-error`} message={error} />
    </label>
  );
}

function FieldError({ id, message }: { id?: string; message?: string }) {
  if (!message) return null;

  return (
    <span
      id={id}
      role="alert"
      className="mt-1.5 block text-xs font-black leading-5 text-accent"
    >
      {message}
    </span>
  );
}

function Metric({
  label,
  value,
  accent = false,
}: {
  label: string;
  value: string;
  accent?: boolean;
}) {
  return (
    <div
      className={`rounded-md border px-3 py-2 ${
        accent
          ? "border-[#d0a850]/60 bg-[#d0a850]/20"
          : "border-[#f7f8f4]/14 bg-[#f7f8f4]/8"
      }`}
    >
      <p className="text-[11px] font-black uppercase tracking-[0.1em] text-[#f7f8f4]/48">
        {label}
      </p>
      <p
        className={`mt-1 truncate text-sm font-black ${
          accent ? "text-[#d0a850]" : "text-[#f7f8f4]"
        }`}
      >
        {value}
      </p>
    </div>
  );
}

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-4 border-b border-[#151a17]/8 pb-2 last:border-b-0 last:pb-0">
      <dt className="text-xs font-bold leading-5 text-[#151a17]/48">{label}</dt>
      <dd className="max-w-40 text-right text-xs font-black leading-5 text-[#151a17]">
        {value}
      </dd>
    </div>
  );
}

function calculatePrice({
  formData,
  selectedOption,
  selectedDuration,
  selectedFrequency,
  selectedAddOnsCount,
  priceCopy,
}: {
  formData: WizardFormData;
  selectedOption: PriceOption;
  selectedDuration: CleaningDuration;
  selectedFrequency: FrequencyOption;
  selectedAddOnsCount: number;
  priceCopy: ServicesPageUi["price"];
}): PriceSummary {
  const basePrice = parsePrice(selectedOption.price);

  if (basePrice === null) {
    return {
      totalLabel: priceCopy.customQuote,
      lines: [
        { label: priceCopy.package, value: selectedOption.price },
        { label: priceCopy.reason, value: priceCopy.manualPricing },
      ],
    };
  }

  const roomCount = Math.max(toNumber(formData.rooms), 1);
  const bathroomCount = Math.max(toNumber(formData.bathrooms), 1);
  const squareMeters = toNumber(formData.squareMeters);
  const hasSquareMeterPricing = selectedOption.price.includes("/ m2");
  const isWaitingForSquareMeters = hasSquareMeterPricing && squareMeters === 0;
  const squareMeterBase =
    hasSquareMeterPricing && squareMeters > 0
      ? basePrice * squareMeters
      : basePrice;
  const durationAdjusted = Math.round(
    squareMeterBase * selectedDuration.multiplier
  );
  const roomSurcharge = isWaitingForSquareMeters
    ? 0
    : Math.max(roomCount - 1, 0) * 250;
  const bathroomSurcharge = isWaitingForSquareMeters
    ? 0
    : Math.max(bathroomCount - 1, 0) * 300;
  const addOnsSurcharge = isWaitingForSquareMeters
    ? 0
    : selectedAddOnsCount * 250;
  const subtotal =
    durationAdjusted + roomSurcharge + bathroomSurcharge + addOnsSurcharge;
  const discount = Math.round(subtotal * selectedFrequency.discount);
  const total = subtotal - discount;

  return {
    totalLabel: isWaitingForSquareMeters
      ? `${priceCopy.from} ${formatCurrency(basePrice)} ${priceCopy.perM2}`
      : formatCurrency(total),
    lines: [
      { label: priceCopy.base, value: selectedOption.price },
      { label: priceCopy.duration, value: selectedDuration.label },
      { label: priceCopy.rooms, value: String(roomCount) },
      { label: priceCopy.bathrooms, value: String(bathroomCount) },
      { label: priceCopy.extras, value: String(selectedAddOnsCount) },
      {
        label: priceCopy.discount,
        value:
          selectedFrequency.discount > 0
            ? `-${formatCurrency(discount)}`
            : priceCopy.zeroCurrency,
      },
    ],
  };
}

function getStepErrors(
  step: number,
  formData: WizardFormData,
  selectedOption: PriceOption,
  validation: ServicesPageUi["validation"]
) {
  const errors: FieldErrors = {};

  if (step === 0) {
    if (!hasText(formData.city)) {
      errors.city = validation.cityRequired;
    }

    if (!hasText(formData.district)) {
      errors.district = validation.districtRequired;
    }

    return errors;
  }

  if (step === 1) {
    if (!hasText(formData.serviceId)) {
      errors.serviceId = validation.serviceRequired;
    }

    if (!hasText(formData.optionId)) {
      errors.optionId = validation.packageRequired;
    }

    if (!hasText(formData.cleaningDurationId)) {
      errors.cleaningDurationId = validation.durationRequired;
    }

    if (!hasText(formData.frequencyId)) {
      errors.frequencyId = validation.frequencyRequired;
    }

    if (!hasText(formData.paymentMethodId)) {
      errors.paymentMethodId = validation.paymentRequired;
    }

    return errors;
  }

  if (step === 2) {
    const rooms = toNumber(formData.rooms);
    const bathrooms = toNumber(formData.bathrooms);
    const squareMeters = toNumber(formData.squareMeters);
    const needsSquareMeters = selectedOption.price.includes("/ m2");

    if (!isInRange(rooms, 1, 12)) {
      errors.rooms = validation.roomsRange;
    }

    if (!isInRange(bathrooms, 1, 8)) {
      errors.bathrooms = validation.bathroomsRange;
    }

    if (needsSquareMeters && !hasText(formData.squareMeters)) {
      errors.squareMeters = validation.squareMetersRequired;
    } else if (
      hasText(formData.squareMeters) &&
      !isInRange(squareMeters, 1, 1000)
    ) {
      errors.squareMeters = validation.squareMetersRange;
    }

    if (!hasText(formData.date)) {
      errors.date = validation.dateRequired;
    } else if (!isDateInputValue(formData.date)) {
      errors.date = validation.dateInvalid;
    } else if (isPastInputDate(formData.date)) {
      errors.date = validation.datePast;
    }

    if (!hasText(formData.timeRange)) {
      errors.timeRange = validation.timeRequired;
    }

    return errors;
  }

  if (step === 3) {
    if (formData.firstName.trim().length < 2) {
      errors.firstName = validation.firstNameMin;
    }

    if (formData.lastName.trim().length < 2) {
      errors.lastName = validation.lastNameMin;
    }

    if (!hasText(formData.phone)) {
      errors.phone = validation.phoneRequired;
    } else if (countDigits(formData.phone) < 7) {
      errors.phone = validation.phoneInvalid;
    }

    if (hasText(formData.email) && !isValidEmail(formData.email)) {
      errors.email = validation.emailInvalid;
    }

    if (!isAddressDetailedEnough(formData.address)) {
      errors.address = validation.addressDetailed;
    }

    if (!formData.approval) {
      errors.approval = validation.approvalRequired;
    }

    return errors;
  }

  return errors;
}

function hasValidationErrors(errors: FieldErrors) {
  return Object.values(errors).some(Boolean);
}

function getFieldErrorList(
  errors: FieldErrors,
  fieldLabels: ServicesPageUi["fieldLabels"]
) {
  return fieldFocusOrder.flatMap((key) => {
    const message = errors[key];

    if (!message) return [];

    return [
      {
        key,
        label: fieldLabels[key] ?? String(key),
        message,
      },
    ];
  });
}

function getControlClass(baseClass: string, error?: string) {
  return error ? `${baseClass} ${controlErrorClass}` : baseClass;
}

function getErrorId(id: string, error?: string) {
  return error ? `${id}-error` : undefined;
}

function hasText(value: string) {
  return value.trim().length > 0;
}

function isInRange(value: number, min: number, max: number) {
  return value >= min && value <= max;
}

function isDateInputValue(value: string) {
  return /^\d{4}-\d{2}-\d{2}$/.test(value);
}

function isPastInputDate(value: string) {
  return value < getTodayInputValue();
}

function getTodayInputValue() {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

function countDigits(value: string) {
  return value.replace(/\D/g, "").length;
}

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}

function isAddressDetailedEnough(value: string) {
  const normalized = value.replace(/[,.]/g, " ").replace(/\s+/g, " ").trim();

  return normalized.length >= 9 && normalized.split(" ").length >= 2;
}

function parsePrice(price: string) {
  const lowerPrice = price.toLocaleLowerCase("tr-TR");

  if (
    lowerPrice.includes("teklif") ||
    lowerPrice.includes("quote") ||
    lowerPrice.includes("запрос")
  ) {
    return null;
  }

  const normalized = price.replace(/\./g, "").replace(",", ".");
  const match = normalized.match(/\d+(?:\.\d+)?/);

  if (!match) {
    return null;
  }

  return Number(match[0]);
}

function toNumber(value: string) {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : 0;
}

function formatCurrency(amount: number) {
  return `${new Intl.NumberFormat("tr-TR", {
    maximumFractionDigits: 0,
  }).format(amount)} TL`;
}
