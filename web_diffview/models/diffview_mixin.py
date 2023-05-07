import os
import shutil
import tempfile
import uuid
from pathlib import Path
from odoo import _, api, fields, models, SUPERUSER_ID
from odoo.exceptions import UserError, RedirectWarning, ValidationError


class DiffViewMixin(models.Model):
    _name = "mixin.diffview"

    def _gitdiff(self, content1, content2):
        if not content1 or not content2:
            return ""

        return content1 + "!#!#!#!##!#!#!#!!!#######!!!!!!#!#!#!" + content2

        # parent_path = Path(tempfile.mkdtemp())

        # path1 = parent_path / str(uuid.uuid4())
        # path2 = parent_path / str(uuid.uuid4())
        # filename3 = parent_path / str(uuid.uuid4())
        # path1.write_text(content1)
        # path2.write_text(content2)
        # try:
        #     os.system(f'git diff "{path1}" "{path2}" > "{filename3}"')
        #     res = filename3.read_text()
        # finally:
        #     shutil.rmtree(parent_path)
        # return res
