import enum
import typing

T_Result = typing.TypeVar("T_Result")


class Language(str, enum.Enum):
    JAVA = "JAVA"
    JAVASCRIPT = "JAVASCRIPT"
    PYTHON = "PYTHON"

    def visit(
        self,
        java: typing.Callable[[], T_Result],
        javascript: typing.Callable[[], T_Result],
        python: typing.Callable[[], T_Result],
    ) -> T_Result:
        if self.value == "JAVA":
            return java()
        if self.value == "JAVASCRIPT":
            return javascript()
        if self.value == "PYTHON":
            return python()

        # the above checks are exhaustive, but this is necessary to satisfy the type checker
        raise RuntimeError()
