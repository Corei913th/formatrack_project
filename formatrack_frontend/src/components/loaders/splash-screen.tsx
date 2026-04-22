import { motion } from "framer-motion";

export const SplashScreen = () => {
  return (
    <div>
      <motion.div
        className="flex h-screen items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          duration: 0.3,
          ease: "easeOut",
        }}
      >
        <div className="flex w-full flex-col items-center justify-center gap-4 px-8">
          <div className="text-3xl font-extrabold truncate leading-none py-1.5 w-fit tracking-wider lg:tracking-tighter">
            Enrolcm App<sup className="ml-0.5 text-xs font-medium">TM</sup>
          </div>

          <div className="relative h-2.5 w-full overflow-hidden rounded-lg bg-accent md:max-w-xl xl:max-w-sm">
            <div className="duration-[1500ms] absolute inset-0 h-full w-full animate-splash-progress rounded-lg bg-primary" />
          </div>
        </div>
      </motion.div>
    </div>
  );
};
