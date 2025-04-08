import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "components/ui/dialog";

export default function Auth(isOpen, setIsOpen) {
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent
        className={`sm:max-w-[425px] ${
          theme === "dark" ? "bg-black text-white" : "bg-white text-black"
        } p-6 rounded-lg`}
      >
        <DialogHeader>
          <DialogTitle className="text-center my-4">Login</DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="student">
          <TabsList className="grid w-full grid-cols-2 mb-4">
            <TabsTrigger value="student">Student</TabsTrigger>
            <TabsTrigger value="teacher">Teacher</TabsTrigger>
          </TabsList>

          <TabsContent value="student">
            <form className="space-y-4" onSubmit={handleSubmit}>
              <Input
                placeholder="Student Email"
                type="email"
                required
                className={`${
                  theme === "dark"
                    ? "bg-gray-800 text-white"
                    : "bg-gray-100 text-black"
                }`}
              />
              <Input
                placeholder="Password"
                type="password"
                required
                className={`${
                  theme === "dark"
                    ? "bg-gray-800 text-white"
                    : "bg-gray-100 text-black"
                }`}
              />
              <Button type="submit" className="w-full bg-green-500 text-white">
                Login as Student
              </Button>
            </form>
          </TabsContent>

          <TabsContent value="teacher">
            <form className="space-y-4" onSubmit={handleSubmit}>
              <Input
                placeholder="Teacher Email"
                type="email"
                required
                className={`${
                  theme === "dark"
                    ? "bg-gray-800 text-white"
                    : "bg-gray-100 text-black"
                }`}
              />
              <Input
                placeholder="Password"
                type="password"
                required
                className={`${
                  theme === "dark"
                    ? "bg-gray-800 text-white"
                    : "bg-gray-100 text-black"
                }`}
              />
              <Button type="submit" className="w-full bg-blue-500 text-white">
                Login as Teacher
              </Button>
            </form>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
