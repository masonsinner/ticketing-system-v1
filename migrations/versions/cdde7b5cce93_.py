"""empty message

Revision ID: cdde7b5cce93
Revises: fb83113a2096
Create Date: 2023-07-07 05:51:55.680474

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'cdde7b5cce93'
down_revision = 'fb83113a2096'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('user', schema=None) as batch_op:
        batch_op.drop_constraint('user_company_id_fkey', type_='foreignkey')
        batch_op.drop_column('company_id')

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('user', schema=None) as batch_op:
        batch_op.add_column(sa.Column('company_id', sa.INTEGER(), autoincrement=False, nullable=True))
        batch_op.create_foreign_key('user_company_id_fkey', 'company', ['company_id'], ['id'])

    # ### end Alembic commands ###
